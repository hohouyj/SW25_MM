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