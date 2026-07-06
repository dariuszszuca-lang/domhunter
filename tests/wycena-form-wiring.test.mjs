import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("formularz wyceny wysyla dane do API zamiast udawac sukces", async () => {
  const form = await source("components/sections/wycena-cta.tsx");

  assert.match(form, /fetch\(["'`]\/api\/wycena["'`]/);
  assert.doesNotMatch(form, /setTimeout\(/);
});

test("API wyceny istnieje i korzysta ze skonfigurowanej wysylki", async () => {
  const routePath = new URL("app/api/wycena/route.ts", root);

  assert.equal(existsSync(routePath), true, "brakuje app/api/wycena/route.ts");

  const route = await source("app/api/wycena/route.ts");
  assert.match(route, /export\s+async\s+function\s+POST/);
  assert.match(route, /CONTACT_TO_EMAIL/);
  assert.match(route, /RESEND_API_KEY|sendEmail/);
});
