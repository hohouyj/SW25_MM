import { Aspect, Evocation, FeatureCardConfig, Spell, Stunt } from '../types';

export const stuntConfig: FeatureCardConfig<Stunt> = {
  fields: [
    { key: 'name', isHeader: true },
    { key: 'tradition', isBadge: true },
    { key: 'level', label: 'Level' },
    { key: 'prerequisite', label: 'Prerequisite', hideIfEmpty: true },
    { key: 'compatible', label: 'Compatible', hideIfEmpty: true },
    { key: 'area', label: 'Area', hideIfEmpty: true },
    { key: 'description', label: 'Description', isDescription: true },
  ]
};

export const aspectConfig: FeatureCardConfig<Aspect> = {
  fields: [
    { key: 'name', isHeader: true },
    { key: 'tradition', isBadge: true },
    { key: 'level', label: 'Level' },
    { key: 'cost', label: 'Cost', hideIfEmpty: true },
    { key: 'duration', label: 'Duration', hideIfEmpty: true },
    { key: 'type', label: 'Type', hideIfEmpty: true },
    { key: 'description', label: 'Description', isDescription: true },
    { key: 'power_table', label: 'Power Table', isDescription: true, hideIfEmpty: true },
  ]
};

export const evocationConfig: FeatureCardConfig<Evocation> = {
  fields: [
    { key: 'name', isHeader: true },
    { key: 'tradition', isBadge: true },
    { key: 'level', label: 'Level' },
    { key: 'cards', label: 'Cards', hideIfEmpty: true },
    { key: 'target', label: 'Target', hideIfEmpty: true },
    { key: 'rangearea', label: 'Range/Area', hideIfEmpty: true },
    { key: 'duration', label: 'Duration', hideIfEmpty: true },
    { key: 'resistance', label: 'Resistance', hideIfEmpty: true },
    { key: 'description', label: 'Description', isDescription: true },
    { key: 'power_table', label: 'Power Table', isDescription: true, hideIfEmpty: true },
    { key: 'card_grades', label: 'Card Grades', isCustom: true },
  ]
};

export const spellConfig: FeatureCardConfig<Spell> = {
  fields: [
    { key: 'name', isHeader: true },
    { key: 'tradition', isBadge: true },
    { key: 'level', label: 'Level' },
    { key: 'cost', label: 'Cost', hideIfEmpty: true },
    { key: 'target', label: 'Target', hideIfEmpty: true },
    { key: 'duration', label: 'Duration', hideIfEmpty: true },
    { key: 'rangearea', label: 'Range/Area', hideIfEmpty: true },
    { key: 'resistance', label: 'Resistance', hideIfEmpty: true },
    { key: 'description', label: 'Description', isDescription: true },
    { key: 'power_table', label: 'Power Table', isDescription: true },
  ]
};