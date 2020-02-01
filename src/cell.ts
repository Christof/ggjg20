import { Container, LoaderResource, IPoint } from 'pixi.js';
import { Tree } from './tree';

export class Cell {
  private hasTree = false;

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
}
