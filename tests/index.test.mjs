import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('keeps endpoints of straight line', () => {
  assert.deepEqual(
    api.simplifyPolyline(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      0,
    ),
    [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ],
  );
});
test('removes within-tolerance deviation', () => {
  assert.equal(
    api.simplifyPolyline(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0.01 },
        { x: 2, y: 0 },
      ],
      0.1,
    ).length,
    2,
  );
});
test('retains significant corner', () => {
  assert.deepEqual(
    api.simplifyPolyline(
      [
        { x: 0, y: 0 },
        { x: 1, y: 2 },
        { x: 2, y: 0 },
      ],
      0.5,
    ),
    [
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 0 },
    ],
  );
});
test('handles coincident endpoints', () => {
  assert.deepEqual(
    api.simplifyPolyline(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ],
      0.1,
    ),
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ],
  );
});
test('returns a copy for short inputs', () => {
  const p = [{ x: 1, y: 2 }];
  const out = api.simplifyPolyline(p, 1);
  assert.notEqual(out[0], p[0]);
});
test('rejects negative tolerance', () => {
  assert.throws(
    () =>
      api.simplifyPolyline(
        [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
        -1,
      ),
    RangeError,
  );
});
