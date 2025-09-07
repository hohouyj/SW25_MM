import { Divider, Group, Text, List } from '@mantine/core';
import { Aspect, ClassFeature, EssenceWeaving, Evocation, FeatureCardConfig, Finale, Maneuver, SelectedFeature, Spell, Spellsong, Stratagem, Stunt, Technique } from '../../types';

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
    {
      key: 'card_grades', label: 'Card Grades', isCustom: true, render: (grades: Evocation['card_grades'], key: string) => {
        if (!grades || Object.keys(grades).length === 0) return null;
        return (
          <div key={key}>
            <Divider mt="sm" mb="xs" />
            <Text fw={500} size="sm" mb="xs">
              Card Grades:
            </Text>
            <List spacing="xs" size="sm" withPadding>
              {Object.entries(grades).map(([grade, effect]) => (
                <List.Item key={grade}>
                  <Text span fw={500}>{grade}</Text>: {effect}
                </List.Item>
              ))}
            </List>
          </div>
        );
      }
    },
  ]
};

export const classFeatureConfig: FeatureCardConfig<ClassFeature> = {
  fields: [
    { key: 'name', isHeader: true },
    { key: 'gain', label: 'Gain', hideIfEmpty: true },
    { key: 'use', label: 'Use', hideIfEmpty: true },
    { key: 'description', label: 'Description', isDescription: true },
  ]
};

export const selectedFeatureConfig: FeatureCardConfig<SelectedFeature> = {
  fields: [
    { key: 'name', isHeader: true },
    { key: 'prerequisite', label: 'Prerequisite', hideIfEmpty: true },
    { key: 'use', label: 'Use', hideIfEmpty: true },
    { key: 'description', label: 'Description', isDescription: true },
  ]
};

export const finaleConfig: FeatureCardConfig<Finale> = {
  fields: [
    { key: 'name', isHeader: true },
    { key: 'tradition', isBadge: true },
    { key: 'level', label: 'Level' },
    { key: 'rhythm_cost', label: 'Rhythm Cost', hideIfEmpty: true },
    { key: 'resistance', label: 'Resistance', hideIfEmpty: true },
    { key: 'type', label: 'Type', hideIfEmpty: true },
    { key: 'description', label: 'Description', isDescription: true },
    { key: 'power_table', label: 'Power Table', isDescription: true, hideIfEmpty: true }
  ]
};

export const maneuverConfig: FeatureCardConfig<Maneuver> = {
  fields: [
    { key: 'name', isHeader: true },
    { key: 'tradition', isBadge: true },
    { key: 'level', label: 'Level' },
    { key: 'edge_cost', label: 'Edge Cost', hideIfEmpty: true },
    { key: 'prerequisite', label: 'Prerequisite', hideIfEmpty: true },
    { key: 'conditions', label: 'Conditions', hideIfEmpty: true },
    { key: 'description', label: 'Description', isDescription: true }
  ]
};

export const spellsongConfig: FeatureCardConfig<Spellsong> = {
  fields: [
    { key: 'name', isHeader: true },
    { key: 'tradition', isBadge: true },
    { key: 'level', label: 'Level' },
    { key: 'singing', label: 'Singing', hideIfEmpty: true },
    {
      key: 'pet', label: 'Pet', hideIfEmpty: true, render: (pets: string[] | string | null | undefined) => {
        if (!pets) return '';
        return Array.isArray(pets) ? pets.join(', ') : pets;
      }
    },
    { key: 'effect_condition', label: 'Effect Condition', hideIfEmpty: true },
    { key: 'resistance', label: 'Resistance', hideIfEmpty: true },
    { key: 'type', label: 'Type', hideIfEmpty: true },
    { key: 'base_rhythm', label: 'Base Rhythm', hideIfEmpty: true },
    { key: 'flourish_value', label: 'Flourish Value', hideIfEmpty: true },
    { key: 'extra_rhythm', label: 'Extra Rhythm', hideIfEmpty: true },
    { key: 'description', label: 'Description', isDescription: true }
  ]
};

export const stratagemConfig: FeatureCardConfig<Stratagem> = {
  fields: [
    { key: 'name', isHeader: true },
    { key: 'tradition', isBadge: true },
    { key: 'level', label: 'Level' },
    { key: 'rank', label: 'Rank', hideIfEmpty: true },
    { key: 'type', label: 'Type', hideIfEmpty: true },
    { key: 'edge_cost', label: 'Edge Cost', hideIfEmpty: true },
    { key: 'edge_accumulation', label: 'Edge Accumulation', hideIfEmpty: true },
    { key: 'description', label: 'Description', isDescription: true }
  ]
};

export const techniqueConfig: FeatureCardConfig<Technique> = {
  fields: [
    { key: 'name', isHeader: true },
    { key: 'tradition', isBadge: true },
    { key: 'level', label: 'Level' },
    { key: 'duration', label: 'Duration', hideIfEmpty: true },
    {
      key: 'attack',
      label: 'Attack',
      hideIfEmpty: true,
      isCustom: true,
      render: (attack: Technique['attack'], key: string, gap: number) => {
        if (!attack) return null;

        const fields = [
          { label: 'Attack Roll', value: attack.attack_roll },
          { label: 'Target', value: attack.target },
          { label: 'Range/Area', value: attack.rangearea },
          { label: 'Resistance', value: attack.resistance },
          { label: 'Type', value: attack.type },
          { label: 'Description', value: attack.description },
        ];

        return (
          <div key={key}>
            {fields
              .filter(field => field.value) // Only show if value exists
              .map((field, index) => (
                <Group key={index} gap={gap}>
                  <Text fw={500} w={120}>{field.label}</Text>
                  <Text>{field.value}</Text>
                </Group>
              ))}
          </div>
        );
      }
    },

    { key: 'description', label: 'Description', isDescription: true },
    { key: 'power_table', label: 'Power Table', isDescription: true, hideIfEmpty: true }
  ]
};

export const essenceWeavingConfig: FeatureCardConfig<EssenceWeaving> = {
  fields: [
    { key: 'name', isHeader: true },
    { key: 'tradition', isBadge: true },
    { key: 'level', label: 'Level' },
    { key: 'cost', label: 'Cost', hideIfEmpty: true },
    { key: 'prerequisite', label: 'Prerequisite', hideIfEmpty: true },
    { key: 'target', label: 'Target', hideIfEmpty: true },
    { key: 'rangearea', label: 'Range/Area', hideIfEmpty: true },
    { key: 'duration', label: 'Duration', hideIfEmpty: true },
    { key: 'resistance', label: 'Resistance', hideIfEmpty: true },
    { key: 'summary', label: 'Summary', hideIfEmpty: true },
    { key: 'description', label: 'Description', isDescription: true },
    { key: 'power_table', label: 'Power Table', isDescription: true, hideIfEmpty: true }
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

// Define a union of tradition names
export type FeatureName =
  | 'stunts'
  | 'aspects'
  | 'evocations'
  | 'class_features'
  | 'selected_features'
  | 'finales'
  | 'maneuvers'
  | 'spellsongs'
  | 'stratagems'
  | 'techniques'
  | 'essence_weavings'
  | 'spells';

// Map tradition to config
const featureMap: Record<FeatureName, FeatureCardConfig<any>> = {
  stunts: stuntConfig,
  aspects: aspectConfig,
  evocations: evocationConfig,
  class_features: classFeatureConfig,
  selected_features: selectedFeatureConfig,
  finales: finaleConfig,
  maneuvers: maneuverConfig,
  spellsongs: spellsongConfig,
  stratagems: stratagemConfig,
  techniques: techniqueConfig,
  essence_weavings: essenceWeavingConfig,
  spells: spellConfig,
};

/**
 * Returns the FeatureCardConfig for a given feature name.
 * @param feature - e.g. "spell", "technique", "finale"
 */
export function getConfigForfeature(feature: FeatureName): FeatureCardConfig<any> {
  return featureMap[feature];
}