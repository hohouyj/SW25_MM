// spellCasterStorage.ts
import { SpellCaster } from "../types";

const STORAGE_KEY = "spellCasters";

export function getAllSpellCasters(): SpellCaster[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveSpellCasters(data: SpellCaster[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addSpellCaster(newCaster: SpellCaster) {
  const all = getAllSpellCasters();
  all.push(newCaster);
  saveSpellCasters(all);
}

export function updateSpellCaster(updated: SpellCaster) {
  const all = getAllSpellCasters().map((sc) =>
    sc.id === updated.id ? updated : sc
  );
  saveSpellCasters(all);
}

export function deleteSpellCaster(id: string) {
  const all = getAllSpellCasters().filter((sc) => sc.id !== id);
  saveSpellCasters(all);
}
