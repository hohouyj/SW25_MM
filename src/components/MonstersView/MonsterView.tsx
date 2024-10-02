import { SimpleGrid, List, TagsInput, MantineProvider } from "@mantine/core";
import MonsterCard from "../MonsterCard";
import monstersJSON from "../../data/monsters.json";
import { Monster } from "../../types";
import { useState } from "react";

export default function () {
  const Monsters = monstersJSON.allmonsters.sort(
    (a, b) => parseInt(a.level) - parseInt(b.level)
  );

  const [monsterSelected, setMonsterSelected] = useState<Monster>(Monsters[0]);

  return (
    <MantineProvider>
      <TagsInput />

      <SimpleGrid cols={2}>
        <div>
          <List>
            {Monsters.map((monster: Monster) => {
              return (
                <List.Item onClick={() => setMonsterSelected(monster)}>
                  {`${monster.level} ${monster.monstertype} ${monster.monstername} (${monster.source})`}
                </List.Item>
              );
            })}
          </List>
        </div>
        <div>
          <MonsterCard monster={monsterSelected} />
        </div>
      </SimpleGrid>
    </MantineProvider>
  );
}
