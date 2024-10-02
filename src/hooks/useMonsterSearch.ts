import Fuse from 'fuse.js'
import { useState, ChangeEvent, useMemo } from 'react';
import { MonsterData } from '../types';
import monsterData from "../data/monsters.json";
import { useDebouncedValue } from '@mantine/hooks';



const useMonsterSearch = () => {
    const [keys, setKeys] = useState<string[]>(["monstername", "habitat"]);
    const [query, setQuery] = useState<string>("Abyss Minions");
    const [debounced] = useDebouncedValue(query, 300);
    const searchClient = useMemo(() => {
        const fuseOptions = {
            // isCaseSensitive: false,
            // includeScore: false,
            // shouldSort: true,
            // includeMatches: false,
            // findAllMatches: false,
            // minMatchCharLength: 1,
            // location: 0,
            // threshold: 0.6,
            // distance: 100,
            // useExtendedSearch: false,
            // ignoreLocation: false,
            // ignoreFieldNorm: false,
            // fieldNormWeight: 1,
            keys
        };
        return new Fuse(monsterData.allmonsters, fuseOptions);
    }, [keys]);

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.type);
        let val = event.currentTarget.value;
        setQuery(val);
    };

    const results = searchClient.search(debounced).map(result => result.item);

    return {
        query,
        setQuery,
        handleQueryChange,
        results
    }
};

export default useMonsterSearch;