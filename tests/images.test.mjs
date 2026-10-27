import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  pageImages,
  contentImageAssignments,
} from "../src/data/pageImages.mjs";
import { imageSizes } from "../src/data/imageSizes.mjs";
import { procedures } from "../src/data/procedures.mjs";

test("every content image is local, available and has intrinsic size metadata", () => {
  for (const { slot, src } of contentImageAssignments()) {
    assert.match(src, /^\/assets\/images\/[\w/.-]+\.jpg$/, slot);
    assert.ok(!src.includes(".."), slot);
    assert.ok(
      existsSync(new URL(`../public${src}`, import.meta.url)),
      `${slot}: missing ${src}`,
    );
    assert.ok(
      imageSizes[src]?.width > 0 && imageSizes[src]?.height > 0,
      `${slot}: missing intrinsic dimensions`,
    );
  }
});

test("content slots never reuse a URL or an identical image file", () => {
  const urls = new Map();
  const hashes = new Map();
  for (const { slot, src } of contentImageAssignments()) {
    assert.ok(!urls.has(src), `${slot} repeats ${urls.get(src)}`);
    urls.set(src, slot);
    const hash = createHash("sha256")
      .update(readFileSync(new URL(`../public${src}`, import.meta.url)))
      .digest("hex");
    assert.ok(
      !hashes.has(hash),
      `${slot} copies the image in ${hashes.get(hash)}`,
    );
    hashes.set(hash, slot);
  }
});

test("each procedure has separate home, directory, detail and case illustrations", () => {
  for (const { slug } of procedures) {
    const images = [
      pageImages.home.procedures[slug],
      pageImages.directory[slug],
      pageImages.details[slug],
      pageImages.home.cases[slug],
      pageImages.cases[slug],
    ];
    assert.equal(new Set(images).size, images.length, slug);
  }
});
