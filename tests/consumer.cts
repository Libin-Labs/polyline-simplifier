import * as api from '@lp-labs/polyline-simplifier';
import { simplifyPolyline } from '@lp-labs/polyline-simplifier';
const points = simplifyPolyline(
  [
    { x: 0, y: 0 },
    { x: 1, y: 0.01 },
    { x: 2, y: 0 },
  ],
  0.1,
);
if (points.length !== 2) throw new Error('Expected a simplified straight path');
// @ts-expect-error invalid argument must be rejected by declarations
api.simplifyPolyline([], 'wide');
