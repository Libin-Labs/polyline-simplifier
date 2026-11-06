export interface Point {
  readonly x: number;
  readonly y: number;
}
function distanceSq(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x,
    dy = b.y - a.y;
  if (dx === 0 && dy === 0) return (p.x - a.x) ** 2 + (p.y - a.y) ** 2;
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)));
  return (p.x - a.x - t * dx) ** 2 + (p.y - a.y - t * dy) ** 2;
}
export function simplifyPolyline(points: readonly Point[], tolerance: number): Point[] {
  if (!Array.isArray(points) || points.length > 100000)
    throw new RangeError('Point count exceeds budget');
  if (typeof tolerance !== 'number' || !Number.isFinite(tolerance) || tolerance < 0)
    throw new RangeError('Tolerance must be finite and nonnegative');
  for (const p of points)
    if (
      typeof p.x !== 'number' ||
      typeof p.y !== 'number' ||
      !Number.isFinite(p.x) ||
      !Number.isFinite(p.y)
    )
      throw new TypeError('Points must be finite');
  if (points.length <= 2) return points.map((p) => ({ x: p.x, y: p.y }));
  const keep = new Uint8Array(points.length);
  keep[0] = 1;
  keep[points.length - 1] = 1;
  const stack: Array<[number, number]> = [[0, points.length - 1]],
    limit = tolerance * tolerance;
  while (stack.length) {
    const [start, end] = stack.pop()!;
    let far = -1,
      max = limit;
    for (let i = start + 1; i < end; i++) {
      const d = distanceSq(points[i]!, points[start]!, points[end]!);
      if (d > max) {
        max = d;
        far = i;
      }
    }
    if (far >= 0) {
      keep[far] = 1;
      stack.push([start, far], [far, end]);
    }
  }
  return points.filter((_, i) => keep[i] === 1).map((p) => ({ x: p.x, y: p.y }));
}
