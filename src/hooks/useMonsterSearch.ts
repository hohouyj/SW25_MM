import Fuse from "fuse.js";
import { useState, useMemo } from "react";
import monsterData from "../data/monsters.json";
import { useDebouncedValue } from "@mantine/hooks";

// type ResultType = {
//   item: any;
// };

type TagQuery =
  | { monstername: string }
  | { habitat: string }
  | { level: string } // Here the value can be either a string or an empty string
  | { monstertype: string }
  | { "uniqueskills.abilities.title": string }
  | { "uniqueskills.abilities.description": string };

type SearchQuery = {
  $and: Array<{
    $or: Array<TagQuery>;
  }>;
};
const useMonsterSearch = () => {
  const keys = useMemo<string[]>(
    () => [
      "monstername",
      "habitat",
      "level",
      "monstertype",
      "uniqueskills.abilities.title",
      "uniqueskills.abilities.description",
    ],
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
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      // fieldNormWeight: 1,
      // useExtendedSearch: true,1
      // sortFn: (a: ResultType, b: ResultType) => {
      //   return parseInt(a.item[2].v) - parseInt(b.item[2].v);
      // },
      keys,
    };
    return new Fuse(monsterData.allmonsters, fuseOptions);
  }, [keys]);
  const [tags, setTags] = useState<string[]>(["Abyss Minions"]);
  const [debouncedTags] = useDebouncedValue(tags, 300);
  const query = useMemo<SearchQuery>(() => {
    const conditions = tags.map((tag) => {
      let tagQueries: TagQuery[] = [];
      if (isNaN(parseInt(tag))) {
        tagQueries = [
          { monstername: tag },
          { habitat: tag },
          { level: "" },
          { monstertype: tag },
          { "uniqueskills.abilities.title": tag },
          { "uniqueskills.abilities.description": tag },
        ];
      } else {
        tagQueries = [
          { monstername: "" },
          { habitat: "" },
          { level: tag },
          { monstertype: "" },
          { "uniqueskills.abilities.title": "" },
          { "uniqueskills.abilities.description": "" },
        ];
      }

      return { $or: tagQueries };
    });

    return {
      $and: conditions,
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

export default useMonsterSearch;
