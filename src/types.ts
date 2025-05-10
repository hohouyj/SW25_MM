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
}