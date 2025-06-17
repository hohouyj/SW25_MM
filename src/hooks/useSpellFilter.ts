import { useCallback, useMemo, useState } from "react";
import { Spell } from "../types";

export type KeyOfSpellWithSearch = keyof Spell | "search";

export type SpellFilters = Partial<Record<KeyOfSpellWithSearch, string | null>>;

export function useSpellFilter(spells: Spell[]) {
  const [filters, setFilters] = useState<SpellFilters>({
    search: "",
    tradition: null,
    cost: null,
    magisphere: null,
    fairy_magic_type: null,
    target: null,
    resistance: null,
    type: null,
    casting_time: null,
    rangearea: null,
    duration: null,
  });

  const updateFilters = useCallback((key: KeyOfSpellWithSearch) =>  (value: string | null) => {
    setFilters((prev) => ({...prev, [key]: value})
    )
  }, []);

  const filteredSpells = useMemo<Spell[]>(() => {
    const filterKeyValues = Object.entries(filters);
    const spellMatchesAllFilters = (spell: Spell) =>
      filterKeyValues.every(([key, value]) => {
        if (!value) return true; // If no filter value, accept all for current key
        switch (key) {
          case "magisphere": {
            return spell.magisphere?.includes(value);
          }
          case "search": {
            return [
              spell.name,
              spell.summary,
              spell.description,
              spell.power_table,
            ]
              .filter(Boolean)
              .some(
                (spellValue): spellValue is string =>
                  typeof spellValue === "string" &&
                  spellValue.toLowerCase().includes(value.toLowerCase())
              );
          }
          default: {
            const spellKey = key as keyof Spell;
            const spellValue = spell[spellKey];
            return (
              typeof spellValue === "string" &&
              spellValue.toLowerCase() === value?.toLowerCase()
            );
          }
        }
      });

    return spells.filter((spell) => spellMatchesAllFilters(spell));
  }, [spells, filters]);

  const getUniqueSortedOptions = useCallback(
    <K extends keyof Spell>(
      data: Spell[],
      key: K,
      sortFunc?: ((a: string, b: string) => number) | undefined
    ): string[] => {
      return Array.from(
        new Set(
          data
            .map((item) => item[key])
            .filter(
              (v): v is string => typeof v === "string" && v.trim() !== ""
            )
        )
      ).sort(sortFunc);
    },
    []
  );

  const extractFirstNumber = useCallback((str: string | null | undefined): number => {
    if (!str) return Infinity;
    const match = str.match(/\d+/); // Match one or more digits
    return match ? parseInt(match[0], 10) : Infinity;
  }, []);

  return {
    filters,
    updateFilters,
    filteredSpells,
    options: {
      tradition: getUniqueSortedOptions(filteredSpells, "tradition"),
      cost: getUniqueSortedOptions(
        filteredSpells,
        "cost",
        (a, b) => extractFirstNumber(a) - extractFirstNumber(b)
      ),
      magisphere: getUniqueSortedOptions(filteredSpells, "magisphere"),
      fairy_magic_type: getUniqueSortedOptions(filteredSpells, "fairy_magic_type"),
      target: getUniqueSortedOptions(filteredSpells, "target"),
      resistance: getUniqueSortedOptions(filteredSpells, "resistance"),
      type: getUniqueSortedOptions(filteredSpells, "type"),
      casting_time: getUniqueSortedOptions(filteredSpells, "casting_time"),
      rangearea: getUniqueSortedOptions(filteredSpells, "rangearea"),
      duration: getUniqueSortedOptions(filteredSpells, "duration"),
    },
  };
}
