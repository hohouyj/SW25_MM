import { useDebouncedValue } from "@mantine/hooks";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import spellData from "../data/stunts/stunts.json";

// type ResultType = {
//   item: any;
// };

type TagQuery =
  | { name: string }
  | { cost: string }
  | { level: string }
  | { tradition: string };

type SearchQuery = {
  $and: Array<{ $or: Array<TagQuery> } | TagQuery>;
}; // fuse js query type
const useStuntSearch = () => {
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
    return new Fuse(spellData.stunts, fuseOptions);
  }, [keys]);
  const [tags, setTags] = useState<string[]>(["Fire Bolt"]);
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

  const results = searchClient
    .search(query)
    .map((result) => result.item)
    .sort((item1, item2) => {
      return parseInt(item1.level) - parseInt(item2.level);
    });

  return {
    tags,
    setTags,
    removeTag,
    results,
  };
};


export default useStuntSearch;
