import { Container, LoaderResource, IPoint } from 'pixi.js';
import { Tree } from './tree';
import { BurningTree } from './burning_tree';
import { Water } from './water';

export class Cell {
  private hasTree = false;
  private isBurning = false;
  private burningTree: BurningTree;

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
    const tree = new Tree(this.center, angle, this.resources.tree.texture);
    this.container.addChild(tree.sprite);
  }

  quench(angle: number) {
    const water = new Water(this.center, angle);
    this.container.addChild(water.sprite);
  }

  update() {
    if (!this.hasTree) return;

    if (Math.random() > 0.999) {
      this.isBurning = true;

      this.burningTree = new BurningTree(
        this.container.getChildAt(0).transform
      );
      this.container.removeChildren();
      this.container.addChild(this.burningTree.sprite);
    }

    if (this.isBurning && Math.random() > 0.999) {
      this.isBurning = false;
      this.hasTree = false;
      this.burningTree?.cleanup();
      this.container.removeChildren();
    }
  }
}
