import {
  SimpleGrid,
  List,
  TagsInput,
  MantineProvider,
  Grid,
} from "@mantine/core";
import MonsterCard from "../MonsterCard";
import monstersJSON from "../../data/monsters.json";
import { Monster } from "../../types";
import { useState } from "react";
import useMonsterSearch from "../../hooks/useMonsterSearch";

export default function () {
  const Monsters = monstersJSON.allmonsters;

  const { handleTagInputQueryChange, results } = useMonsterSearch();

  const [monsterSelected, setMonsterSelected] = useState<Monster>(Monsters[0]);

  return (
    <MantineProvider>
      <TagsInput
        onChange={handleTagInputQueryChange}
        label="Press Enter to submit a Monster search tag (level, name, habitat, type, skill name, skill description)"
        placeholder="Enter tag"
      />

      <Grid>
        <Grid.Col span={2}>
          <List>
            {results.map((monster: Monster) => {
              return (
                <List.Item onClick={() => setMonsterSelected(monster)}>
                  {`${monster.level} ${monster.monstertype} ${monster.monstername} (${monster.source})`}
                </List.Item>
              );
            })}
          </List>
        </Grid.Col>
        <Grid.Col span={10}>
          <MonsterCard monster={monsterSelected} />
        </Grid.Col>
      </Grid>
    </MantineProvider>
  );
}
