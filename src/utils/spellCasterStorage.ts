// spellCasterStorage.ts
import { SpellCaster } from "../types";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "spellCasters";

export function defaultSpellCaster(): SpellCaster {
    return {
        id: uuidv4(),
        name: "",
        abyssal_magic_level: 0,
        deep_magic_level: 0,
        divine_level: 0,
        divinity: "",
        fairy_magic_level: 0,
        magitech_level: 0,
        nature_level: 0,
        spiritualism_level: 0,
        summoning_arts_level: 0,
        truespeech_level: 0,
        fairy_magic_types: []
    };
}

export function getAllSpellCasters(): SpellCaster[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getSpellCaster(id: string) : SpellCaster {
  const spellCasters = getAllSpellCasters();
  const spellCaster = spellCasters.find((spellCaster: SpellCaster)=> spellCaster.id === id)
  return spellCaster ? spellCaster : defaultSpellCaster();
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

