import { Container, LoaderResource, IPoint } from 'pixi.js';
import { Tree } from './tree';
import { BurningTree } from './burning_tree';
import { TreeExtinguish } from './tree_extinguish';

export class Cell {
  private burningDuration = 10000;
  private requiredDurationToExtinguish = 3000;

  private hasTree = false;
  private isBurning = false;
  private burningStart: number;
  private burningTree: BurningTree;
  private treeExtinguish: TreeExtinguish;
  private extinguishDuration = 0;
  private isExtinguishing = false;
  private treeAngle: number;

  public container: Container;

  constructor(
    private center: IPoint,
    private resources: Partial<Record<string, LoaderResource>>
  ) {
    this.container = new Container();
  }

  plant(angle: number) {
    if (this.hasTree) return;

    this.hasTree = true;
    this.treeAngle = angle;
    const tree = new Tree(this.center, angle, this.resources.tree.texture);
    this.container.addChild(tree.sprite);
  }

  extinguish(angle: number, frameDuration: number) {
    if (!this.burningTree) return;

    const distanceToTree = Math.abs(angle - this.treeAngle);
    if (distanceToTree < 0.04) {
      this.extinguishDuration += frameDuration;

      if (!this.isExtinguishing) {
        this.isExtinguishing = true;

        this.container.removeChildren();
        this.burningTree.cleanup();

        this.treeExtinguish = new TreeExtinguish(
          this.burningTree.sprite.transform
        );
        this.container.addChild(this.treeExtinguish.sprite);
        this.burningTree = undefined;
      }
    }

    if (this.extinguishDuration > this.requiredDurationToExtinguish) {
      this.isBurning = false;
      this.extinguishDuration = 0;

      this.treeExtinguish.cleanup();
      this.treeExtinguish = undefined;
      this.container.removeChildren();

      const tree = new Tree(
        this.center,
        this.treeAngle,
        this.resources.tree.texture
      );
      this.container.addChild(tree.sprite);
    }
  }

  update() {
    if (!this.hasTree) return;

    if (Math.random() > 0.999 && !this.isBurning) {
      this.isBurning = true;
      this.burningStart = Date.now();

      this.burningTree = new BurningTree(
        this.container.getChildAt(0).transform
      );
      this.container.removeChildren();
      this.container.addChild(this.burningTree.sprite);
    }

    if (
      this.isBurning &&
      Date.now() - this.burningStart > this.burningDuration
    ) {
      this.isBurning = false;
      this.burningStart = undefined;
      this.hasTree = false;
      this.burningTree?.cleanup();
      this.treeExtinguish?.cleanup();
      this.container.removeChildren();
      this.burningTree = undefined;
      this.treeExtinguish = undefined;
    }
  }
}
