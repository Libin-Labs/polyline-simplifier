# @lp-labs/polyline-simplifier

Iterative Ramer-Douglas-Peucker simplification for bounded 2D point sequences.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/polyline-simplifier
```

## Working example

```js
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
```

CommonJS: `const api = require('@lp-labs/polyline-simplifier')`.

## Behavior, customization and limits

Uses perpendicular Euclidean distance to each segment, retains endpoints and returns fresh points. This is a geometric simplifier, not topology-preserving polygon simplification; tolerance is in the caller’s coordinate units.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface Point {
  readonly x: number;
  readonly y: number;
}
export declare function simplifyPolyline(points: readonly Point[], tolerance: number): Point[];
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
