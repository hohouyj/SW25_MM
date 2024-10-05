import Fuse from "fuse.js";
import { useState, ChangeEvent, useMemo } from "react";
import monsterData from "../data/monsters.json";
import { useDebouncedValue } from "@mantine/hooks";

type QueryType = {
  $or: [
    { monstername: string },
    { habitat: string },
    { level: string },
    { monstertype: string },
    { "uniqueskills.abilities.title": string },
    { "uniqueskills.abilities.description": string }
  ];
};

const useMonsterSearch = () => {
  const [keys, setKeys] = useState<string[]>([
    "monstername",
    "habitat",
    "level",
    "monstertype",
    "uniqueskills.abilities.title",
    "uniqueskills.abilities.description",
  ]);
  const [query, setQuery] = useState<string>("Abyss Minions");
  const [debounced] = useDebouncedValue(query, 300);
  const [queryTags, setQueryTags] = useState<QueryType[]>([
    {
      monstername: "Abyss Minions",
      habitat: "Abyss Minions",
      level: "Abyss Minions",
      monstertype: "Abyss Minions",
      "uniqueskills.abilities.title": "Abyss Minions",
      "uniqueskills.abilities.description": "Abyss Minions",
    },
  ]);
  const [debouncedTags] = useDebouncedValue(queryTags, 300);
  const searchClient = useMemo(() => {
    const fuseOptions = {
      // isCaseSensitive: false,
      // includeScore: false,
      // shouldSort: true,
      // includeMatches: false,
      findAllMatches: true,
      // minMatchCharLength: 1,
      // location: 0,
      threshold: 0.1,
      distance: 10000,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      // fieldNormWeight: 1,
      // useExtendedSearch: true,
      sortFn: (a, b) => {
        return parseInt(a.item[2].v) - parseInt(b.item[2].v);
      },
      keys,
    };
    return new Fuse(monsterData.allmonsters, fuseOptions);
  }, [keys]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.type);
    let val = event.currentTarget.value;
    setQuery(val);
  };

  const handleTagInputQueryChange = (tags: string[]) => {
    setQueryTags(
      tags.map((tag) => {
        if (isNaN(parseInt(tag))) {
          return {
            $or: [
              { monstername: tag },
              { habitat: tag },
              { level: "" },
              { monstertype: tag },
              { "uniqueskills.abilities.title": tag },
              { "uniqueskills.abilities.description": tag },
            ],
          };
        } else {
          return {
            $or: [
              { monstername: "" },
              { habitat: "" },
              { level: tag },
              { monstertype: "" },
              { "uniqueskills.abilities.title": "" },
              { "uniqueskills.abilities.description": "" },
            ],
          };
        }
      })
    );
  };

  const results = searchClient
    .search({ $and: debouncedTags })
    .map((result) => result.item);

  console.log(results);
  return {
    query,
    setQuery,
    handleQueryChange,
    handleTagInputQueryChange,
    results,
  };
};

export default useMonsterSearch;
