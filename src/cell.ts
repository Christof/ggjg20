import { Container, LoaderResource, IPoint } from 'pixi.js';
import { Tree } from './tree';
import { BurningTree } from './burning_tree';

export class Cell {
  private hasTree = false;
  private isBurning = false;

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

  update() {
    if (!this.hasTree) return;

    if (Math.random() > 0.999) {
      this.isBurning = true;

      const burningTree = new BurningTree(
        this.container.getChildAt(0).transform
      );
      this.container.removeChildren();
      this.container.addChild(burningTree.sprite);
    }
  }
}
