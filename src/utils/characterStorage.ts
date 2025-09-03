// characterStorage.ts
import { Character } from "../types";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "characters";

// Default character
export function defaultCharacter(): Character {
  return {
    id: uuidv4(),
    name: "",
    feature_ids: [],
    //////////////////////
    alchemist_level: 0,
    bard_level: 0,
    dark_hunter_level: 0,
    enhancer_level: 0,
    geomancer_level: 0,
    tactician_level: 0,
    rider_level: 0,
    /////////////////////
    ranger_level: 0,
    sage_level: 0,
    scout_level: 0,
    battle_dancer_level: 0,
    fencer_level: 0,
    fighter_level: 0,
    grappler_level: 0,
    marksman_level: 0,
  };
}

export function getAdventurerLevel(character: Character): number {
   const levels = Object.entries(character)
    .filter(([key]) => key.endsWith("_level"))
    .map(([_, value]) => value as number);

  return Math.max(...levels);
}

export function getActiveClasses(character: Character | null): string[] {
  if (!character) return []; // fixed the check

  return (Object.entries(character) as [keyof Character, any][])
    .filter(([_, value]) => typeof value === "number" && value > 0)
    .map(([key]) => key.replace("_level", "")).filter((className) => [
      "alchemist",
      "bard",
      "dark_hunter",
      "enhancer",
      "geomancer",
      "tactician",
      "rider"
    ].includes(className));
}

export function getPassiveClasses(character: Character | null): string[] {
  if (!character) return [];

  const passiveClasses = [
    "ranger",
    "sage",
    "scout",
    "battle_dancer",
    "fencer",
    "fighter",
    "grappler",
    "marksman",
  ] as const;

  return Object.entries(character)
    .filter(([key, value]) => key.endsWith("_level") && typeof value === "number" && value > 0)
    .map(([key]) => key.replace("_level", ""))
    .filter((className) => passiveClasses.includes(className as typeof passiveClasses[number]));
}


// Get all characters
export function getAllCharacters(): Character[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Get a single character by ID
export function getCharacter(id: string | undefined): Character {
  const characters = getAllCharacters();
  const character = characters.find((c) => c.id === id);
  return character ? character : defaultCharacter();
}

// Save all characters
export function saveCharacters(data: Character[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Add a new character
export function addCharacter(newCharacter: Character) {
  const all = getAllCharacters();
  all.push(newCharacter);
  saveCharacters(all);
}

// Update an existing character
export function updateCharacter(updated: Character) {
  const all = getAllCharacters().map((c) =>
    c.id === updated.id ? updated : c
  );
  saveCharacters(all);
}

// Delete a character by ID
export function deleteCharacter(id: string) {
  const all = getAllCharacters().filter((c) => c.id !== id);
  saveCharacters(all);
}
