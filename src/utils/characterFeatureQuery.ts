import aspectsData from "../data/aspects/aspects.json";
import evocationsData from "../data/evocations/evocations.json";
import finalesData from "../data/finales/finales.json";
import classFeaturesData from "../data/feats/feat-automatic.json";
import selectedFeaturesData from "../data/feats/feats.json";
import maneuversData from "../data/maneuvers/maneuvers.json";
import spellSongsData from "../data/spellsongs/spellsongs.json"
import stuntsData from "../data/stunts/stunts.json";
import strategemsData from "../data/stratagems/stratagems.json";
import techniquesData from "../data/techniques/techniques.json";
import weavingsData from "../data/weavings/weavings.json";
import { FeatureTypeMap, ClassFeature } from "../types";


// Helper to add feature_name
type WithFeatureName<K extends keyof FeatureTypeMap> = FeatureTypeMap[K] & { feature_name: K };

type CombinedFeature =
  | WithFeatureName<'aspects'>
  | WithFeatureName<'evocations'>
  | WithFeatureName<'finales'>
  | WithFeatureName<'class_features'>
  | WithFeatureName<'selected_features'>
  | WithFeatureName<'maneuvers'>
  | WithFeatureName<'spellsongs'>
  | WithFeatureName<'stunts'>
  | WithFeatureName<'stratagems'>
  | WithFeatureName<'techniques'>
  | WithFeatureName<'essence_weavings'>;

const CLASS_TO_FEATURES: Record<string, string[]> = {
  alchemist: ["evocations"],
  bard: ["spellsongs", "finales"],
  dark_hunter: ["essence_weavings"],
  enhancer: ["techniques"],
  geomancer: ["aspects"],
  tactician: ["stratagems", "maneuvers"],
  rider: ["stunts"]
};
export function getFeaturesByClassName(className: string): string[] {
  return CLASS_TO_FEATURES[className] ?? [];
}



// Accept partial objects
function extractAndCombineDynamic<
  K extends keyof FeatureTypeMap
>(...jsonObjects: Partial<Record<K, FeatureTypeMap[K][]>>[]): WithFeatureName<K>[] {
  return jsonObjects.flatMap(obj =>
    (Object.entries(obj) as [K, FeatureTypeMap[K][]][]).flatMap(([key, arr]) =>
      arr.map(item => ({
        ...item,
        feature_name: key
      }))
    )
  );
}

const combined = extractAndCombineDynamic(
  aspectsData,
  evocationsData,
  finalesData,
  classFeaturesData,
  selectedFeaturesData,
  maneuversData,
  spellSongsData,
  stuntsData,
  strategemsData,
  techniquesData,
  weavingsData
);

export function getAllFeatures() {
  return combined
}

export function getFeaturesById<T extends CombinedFeature>(ids: number[] = []): T[] {
  const idSet = new Set(ids);
  return combined.filter((item): item is T => idSet.has(item.id));
}

export function getAutoFeaturesByLevel(
  featureName: string,
  classLevel: number
): ClassFeature[] {
  return classFeaturesData.class_features.filter((item) => {
    const levelMatch = item.gain.match(/\d+/);
    const featureLevel = levelMatch ? Number(levelMatch[0]) : 0;
    const normalizedFeatureGain = item.gain.toLowerCase().replace(/\s+/g, '_');
    return normalizedFeatureGain.includes(featureName) && classLevel >= featureLevel;
  });
}

export function getSelectableFeaturesByLevel(level: number): ClassFeature[] {
  return selectedFeaturesData.selected_features.filter((item) => {
    const level_match = item.prerequisite?.match(/\d+/) ?? "0";
    const feature_level: string = level_match?.[0] ?? "0";
    return level > Number(feature_level)
  });
}

export function getAvailableFeatureIdsByClassAndLevel(
  className: string,
  classLevel: number = 0,
  selected_ids: number[] = []
) {
  const idSet = new Set(selected_ids);
  let minorClassFeatures: any[]; // or the proper type

  switch (className) {
    case "alchemist":
      minorClassFeatures = extractAndCombineDynamic(evocationsData);
      break;
    case "bard":
      minorClassFeatures = extractAndCombineDynamic(spellSongsData, finalesData);
      break;
    case "dark_hunter":
      minorClassFeatures = extractAndCombineDynamic(weavingsData);
      break;
    case "enhancer":
      minorClassFeatures = extractAndCombineDynamic(techniquesData);
      break;
    case "geomancer":
      minorClassFeatures = extractAndCombineDynamic(aspectsData);
      break;
    case "tactician":
      minorClassFeatures = extractAndCombineDynamic(strategemsData, maneuversData);
      break;
    case "rider":
      minorClassFeatures = extractAndCombineDynamic(stuntsData);
      break;
    default:
      minorClassFeatures = [];
  }

  return minorClassFeatures.filter((item) => {
    const isLevelOk = classLevel >= Number(item.level ?? 0);
    const isNotSelected = !idSet.has(item.id);

    return isLevelOk && isNotSelected;
  }).map((item) => item.id);
}


export function getAvailableFeaturesByClassAndLevel(
  className: string,
  classLevel: number = 0,
  selected_ids: number[] = []
) {
  const idSet = new Set(selected_ids);
  let minorClassFeatures: any[]; // or the proper type

  switch (className) {
    case "alchemist":
      minorClassFeatures = extractAndCombineDynamic(evocationsData);
      break;
    case "bard":
      minorClassFeatures = extractAndCombineDynamic(spellSongsData, finalesData);
      break;
    case "dark_hunter":
      minorClassFeatures = extractAndCombineDynamic(weavingsData);
      break;
    case "enhancer":
      minorClassFeatures = extractAndCombineDynamic(techniquesData);
      break;
    case "geomancer":
      minorClassFeatures = extractAndCombineDynamic(aspectsData);
      break;
    case "tactician":
      minorClassFeatures = extractAndCombineDynamic(strategemsData, maneuversData);
      break;
    case "rider":
      minorClassFeatures = extractAndCombineDynamic(stuntsData);
      break;
    default:
      minorClassFeatures = [];
  }

  return minorClassFeatures.filter((item) => {
    const isLevelOk = classLevel >= Number(item.level ?? 0);
    const isNotSelected = !idSet.has(item.id);

    return isLevelOk && isNotSelected;
  });
}