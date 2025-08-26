import { useDebouncedValue } from "@mantine/hooks";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
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
import { FeatureName } from "../components/FeatureCard/FeatureCardConfigs";

type TagQuery =
  | { name: string }
  | { cost: string }
  | { level: string }
  | { tradition: string };

type SearchQuery = {
  $and: Array<{ $or: Array<TagQuery> } | TagQuery>;
}; // fuse js query type

const useFeatureSearch = () => {
  const keys = useMemo<string[]>(
    () => ["name", "cost", "level", "tradition"],
    []
  );
  const searchClient = useMemo(() => {
    const fuseOptions = {
      // isCaseSensitive: false,
      // includeScore: false,
      // shouldSort: true,
      // includeMatches: false,
      findAllMatches: true,
      // minMatchCharLength: 1,
      // location: 0,
      threshold: 0.2,
      distance: 10000,
      useExtendedSearch: true,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      // fieldNormWeight: 1,
      // useExtendedSearch: true,1
      // sortFn: (a: ResultType, b: ResultType) => {
      //   return parseInt(a.item[2].v) - parseInt(b.item[2].v);
      // },
      keys,
    };
    function extractAndCombineDynamic(...jsonObjects: Record<string, unknown[]>[]): unknown[] {
      return jsonObjects.flatMap(obj =>
        Object.entries(obj).flatMap(([key, arr]) =>
          (arr as Record<string, unknown>[]).map(item => ({
            ...item,
            feature_name: key // removes plural "s" (e.g., "evocations" -> "evocation")
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
    return new Fuse(combined, fuseOptions);

  }, [keys]);
  const [tags, setTags] = useState<string[]>(["Technique"]);
  const [debouncedTags] = useDebouncedValue(tags, 300);
  const query = useMemo<SearchQuery>(() => {
    const conditions = tags.map((tag) => {
      const match = tag.match(/\d+/);
      const numberString: string = match?.[0] ?? "0"; // Provide default
      if (tag.toLowerCase().includes("level")) {
        return { level: `=${numberString}` };
      }
      if (tag.toLowerCase().includes("mp")) {
        return { cost: `${numberString}` };
      }
      return {
        $or: [{ name: tag }, { tradition: tag }],
      };
    });

    console.log({
      $and: [...conditions],
    });

    return {
      $and: [...conditions],
    };
  }, [debouncedTags]);

  const removeTag = (tag: string) => {
    const newTags = [...tags];
    const tagIndex = newTags.indexOf(tag, 0);
    newTags.splice(tagIndex, 1);
    console.log(newTags);
    setTags(newTags);
  };

  interface SearchableItem {
    level: string; // or number if it's numeric
    [key: string]: any; // optional if more fields exist
    feature_name: FeatureName;
  }

  const results = searchClient
    .search(query)
    .map((result) => result.item as SearchableItem)
    .sort((item1, item2) => parseInt(item1.level) - parseInt(item2.level));

  return {
    tags,
    setTags,
    removeTag,
    results,
  };
};


export default useFeatureSearch;
