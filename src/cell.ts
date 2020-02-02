import { Container, LoaderResource, IPoint } from 'pixi.js';
import { Tree } from './tree';
import { BurningTree } from './burning_tree';

export class Cell {
  private burningDuration = 10000;
  private requiredDurationToExtinguish = 3000;

  private hasTree = false;
  private isBurning = false;
  private burningStart: number;
  private burningTree: BurningTree;
  private extinguishDuration = 0;
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
      console.log(this.extinguishDuration);
    }

    if (this.extinguishDuration > this.requiredDurationToExtinguish) {
      this.burningTree = undefined;
      this.isBurning = false;
      this.extinguishDuration = 0;

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
      this.container.removeChildren();
    }
  }
}
