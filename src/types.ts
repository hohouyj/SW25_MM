export interface CombatStyle {
  style: string;
  accuracy: string;
  damage: string;
  evasion: string;
  defense: string;
  hp: string;
  mp: string;
}

export interface MonsterAbility {
  title: string;
  description: string;
}

export interface MonsterSkill {
  section: string;
  abilities: MonsterAbility[];
}

export interface LootResult {
  roll: string;
  loot: string;
}

export interface Monster {
  monster_id: string;
  monstername: string;
  level: string;
  monstertype: string;
  intelligence: string;
  perception: string;
  disposition: string;
  soulscars: string;
  language: string;
  habitat: string;
  reputation: string;
  weakness: string;
  weakpoint: string;
  initiative: string;
  movementspeed: string;
  fortitude: string;
  willpower: string;
  source: string;
  sections: string;
  mainsection: string;
  description: string;
  uniqueskills: MonsterSkill[];
  combatstyles: CombatStyle[];
  loottable: LootResult[];
  id: number;
}

export interface MonsterData {
  allmonsters: Monster[];
}

export interface EncounterMonster extends Monster {
  name: string;
  currentHp: number;
  currentMp: number;
  willpowerBonus: number;
  fortitudeBonus: number;
  swordshards: number;
}

export interface Encounter {
  monsters: Monster[];
}

export type MonsterPropType = {
  monster: Monster;
};


export interface EncounterConfig {
  monsters: EncounterMonster[];
  description: string;
  name: string;
  campaign: string;
}

// export interface Spell {
//   spell_id: string;
//   spellname: string;
//   tradition: string;
//   divinity: string;
//   level: string;
//   cost: string;
//   target: string;
//   rangearea: string;
//   duration: string;
//   resistance: string;
//   type: string;
//   preptime: string;
//   casttime: string;
//   description: string;
//   elementtype: string | null;
//   sword: string | null;
// }

export interface Spell {
  spell_id: string | number;
  name: string;
  tradition: string;
  level: string;
  description: string;
  power_table?: string | null;
  cost: string;
  target: string;
  duration: string;
  resistance?: string;
  type?: string;
  preparation_time?: string;
  casting_time?: string;
  summary?: string;
  magisphere?: string | null;
  rangearea?: string;
  fairy_magic_type?: string;
  divinity?: string;
  id: number;
};


export interface SpellPropType {
  spell: Spell
}

export interface SpellCaster {
  id: string,
  name: string,
  abyssal_magic_level: number,
  deep_magic_level: number,
  divine_level: number,
  divinity: string | null,
  fairy_magic_level: number,
  magitech_level: number,
  nature_level: number,
  spiritualism_level: number,
  summoning_arts_level: number,
  truespeech_level: number,
  fairy_magic_types: string[]
}

export type SpellBins = Record<string, Spell[]>;

export interface Stunt {
  name: string;
  tradition: string;
  level: string;
  description: string;
  prerequisite: string;
  compatible: string;
  area: string;
  id: number;
}

export interface Aspect {
  name: string;
  tradition: string;  // "Aspect"
  level: string;      // e.g., "5th"
  description: string;
  power_table?: string | null;
  cost?: string;
  duration?: string;
  type?: string;
  id: number;
}

export interface Evocation {
  name: string;
  tradition: string; // "Evocation"
  level: string; // e.g., "5th"
  description: string;
  power_table?: string | null;
  card_grades?: Record<string, string>; // e.g., { B: "None", A: "+1 damage", ... }
  cards?: string;
  target?: string;
  rangearea?: string;
  duration?: string;
  resistance?: string;
  id: number;
}


export interface ClassFeature {
  name: string;
  description: string;
  gain?: string; // e.g., "Grappler Level 7"
  use?: string;  // e.g., "-"
  id: number;
}

export interface SelectedFeature {
  name: string;
  description: string;
  prerequisite?: string;
  use?: string;
  id: number;
}


export interface Finale {
  name: string;
  tradition: string; // "Finale"
  level: string; // e.g., "10"
  rhythm_cost?: string;
  resistance?: string;
  type?: string;
  power_table?: string | null;
  description: string;
  id: number;
}



export interface Maneuver {
  name: string;
  tradition: string; // "Maneuver"
  level: string;
  edge_cost?: string;
  prerequisite?: string;
  conditions?: string;
  description: string;
  id: number;
}

export interface Spellsong {
  name: string;
  tradition: string; // "Spellsong"
  level: string;
  singing?: string;
  pet?: string[];
  effect_condition?: string;
  resistance?: string;
  type?: string;
  base_rhythm?: string;
  flourish_value?: string;
  extra_rhythm?: string;
  description: string;
  id: number;
}

export interface Stratagem {
  name: string;
  tradition: string; // "Stratagem"
  level: string;
  rank?: string;
  type?: string;
  edge_cost?: string;
  edge_accumulation?: string;
  description: string;
  id: number;
}


export interface TechniqueAttack {
  attack_roll?: string;
  target?: string;
  rangearea?: string;
  resistance?: string;
  type?: string;
  description?: string;
}

export interface Technique {
  name: string;
  tradition: string; // "Technique"
  level: string;
  description: string;
  attack?: TechniqueAttack;
  power_table?: string | null;
  duration?: string;
  id: number;
}

export interface EssenceWeaving {
  name: string;
  tradition: string; // "Essence Weaving"
  level: string;
  description: string;
  power_table?: string | null;
  cost?: string;
  prerequisite?: string;
  target?: string;
  rangearea?: string;
  duration?: string;
  resistance?: string;
  summary?: string;
  id: number;
}

export interface FeatureTypeMap {
  stunts: Stunt;
  aspects: Aspect;
  evocations: Evocation;
  class_features: ClassFeature;
  selected_features: SelectedFeature;
  finales: Finale;
  maneuvers: Maneuver;
  spellsongs: Spellsong;
  stratagems: Stratagem;
  techniques: Technique;
  essence_weavings: EssenceWeaving;
}

export interface FieldConfig<T> {
  label?: string;            // Display name for the field
  key: keyof T;              // The property in T
  isHeader?: boolean;        // Appears in the card title
  isBadge?: boolean;         // Appears as a badge next to title
  isDescription?: boolean;   // Renders in description section
  hideIfEmpty?: boolean;     // Skip if value is null/undefined/empty
  isCustom?: boolean;
  render?: Function;
}

export interface FeatureCardConfig<T> {
  fields: FieldConfig<T>[];
}

export interface Character {
  id: string;
  name: string;
  alchemist_level: number;
  bard_level: number;
  dark_hunter_level: number;
  enhancer_level: number;
  geomancer_level: number;
  tactician_level: number;
  rider_level: number;
  ranger_level: number;
  sage_level: number;
  scout_level: number;
  battle_dancer_level: number;
  fencer_level: number;
  fighter_level: number;
  grappler_level: number;
  marksman_level: number;
  feature_ids: number[];
    abyssal_magic_level: number,
  deep_magic_level: number,
  divine_level: number,
  divinity: string | null,
  fairy_magic_level: number,
  magitech_level: number,
  nature_level: number,
  spiritualism_level: number,
  summoning_arts_level: number,
  truespeech_level: number,
  fairy_magic_types: string[]
}