import { IPoint, Point } from 'pixi.js';

export function posFromCylinderCoord(
  center: IPoint,
  radius: number,
  angle: number
) {
  return new Point(
    center.x + radius * Math.cos(angle),
    center.y - radius * Math.sin(angle)
  );
}

export function rotationToCenter(angle: number) {
  return -angle + 0.5 * Math.PI;
}
