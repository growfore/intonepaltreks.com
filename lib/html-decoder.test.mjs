import assert from "node:assert/strict";
import test from "node:test";
import { hasHtmlContent } from "./html-decoder.ts";

test("detects meaningful CMS HTML", () => {
  for (const html of [undefined, null, "", "   ", "<p><br></p>", "<p>&nbsp;</p>"]) {
    assert.equal(hasHtmlContent(html), false);
  }

  for (const html of ["Included meal", "<p>Included meal</p>", '<img src="meal.jpg">']) {
    assert.equal(hasHtmlContent(html), true);
  }
});
