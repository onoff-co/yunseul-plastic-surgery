import test from "node:test";
import assert from "node:assert/strict";
import {
  comparisonPosition,
  clampComparison,
} from "../src/components/shared/comparison.mjs";

test("comparison position follows the pointer relative to the image", () => {
  assert.equal(comparisonPosition(200, { left: 100, width: 200 }), 50);
  assert.equal(comparisonPosition(100, { left: 100, width: 200 }), 0);
  assert.equal(comparisonPosition(300, { left: 100, width: 200 }), 100);
});
test("a drag outside the image stays within the before/after endpoints", () => {
  assert.equal(comparisonPosition(-100, { left: 100, width: 200 }), 0);
  assert.equal(comparisonPosition(900, { left: 100, width: 200 }), 100);
});
test("hidden or invalid measurements have a stable initial comparison", () => {
  assert.equal(comparisonPosition(200, { left: 100, width: 0 }), 50);
  assert.equal(clampComparison(NaN), 50);
  assert.equal(clampComparison(Infinity), 50);
  assert.equal(clampComparison(42.49), 42);
  assert.equal(clampComparison(42.51), 43);
});
