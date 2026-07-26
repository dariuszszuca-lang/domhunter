import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { getFilteredOffers } from "../lib/esti/store.ts";

const root = new URL("../", import.meta.url);

function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("filtr 5+ zwraca wyłącznie oferty z co najmniej pięcioma pokojami", async () => {
  const { items } = await getFilteredOffers({ roomsMin: 5 });

  assert.ok(items.length > 0, "snapshot powinien zawierać oferty 5+");
  assert.ok(
    items.every((offer) => offer.rooms !== undefined && offer.rooms >= 5),
    "filtr 5+ nie może przepuszczać ofert z mniejszą liczbą pokoi"
  );
});

test("lokalizacja działa bez polskich znaków i obejmuje ulicę", async () => {
  const chelm = await getFilteredOffers({ district: "chelm" });
  const wajdeloty = await getFilteredOffers({ district: "wajdeloty" });

  assert.ok(chelm.total > 0, "Chełm powinien być znajdowany po wpisaniu chelm");
  assert.ok(wajdeloty.total > 0, "ulica Wajdeloty powinna być znajdowana jako lokalizacja");
});

test("wybór miasta nie zwraca ofert z innej miejscowości", async () => {
  const { items } = await getFilteredOffers({ city: "Gdańsk" });

  assert.ok(items.length > 0);
  assert.ok(
    items.every((offer) => offer.city === "Gdańsk"),
    "filtr miasta powinien używać dopasowania całej nazwy"
  );
});

test("formularz wyników zachowuje filtry z URL i obsługuje Enter", async () => {
  const [search, page] = await Promise.all([
    source("components/sections/quick-search.tsx"),
    source("app/oferty/page.tsx"),
  ]);

  assert.match(search, /initialFilters/);
  assert.match(search, /<form[\s>]/);
  assert.match(search, /type=["']submit["']/);
  assert.match(page, /roomsMin/);
  assert.match(page, /<QuickSearch[^>]*initialFilters=/s);
});
