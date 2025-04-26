import { List, TagsInput, Grid, Container, Paper } from "@mantine/core";
import MonsterCard from "../MonsterCard";
import monstersJSON from "../../data/monsters.json";
import { Monster } from "../../types";
import { useState } from "react";
import useMonsterSearch from "../../hooks/useMonsterSearch";
import './styles.css';

export default function () {
  const Monsters = monstersJSON.allmonsters;

  const { tags, setTags, removeTag, results } = useMonsterSearch();
  const [monsterSelected, setMonsterSelected] = useState<Monster>(Monsters[0]);

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={2}>
          <section>
            <TagsInput
              allowDuplicates
              value={tags}
              onChange={setTags}
              onRemove={removeTag}
              label="Press Enter to Submit a Search Tag (e.g. abyss minions, forrest, daemon, flight, level 1, 5 sections)"
              placeholder="Enter tag"
              clearable
            />
            <List display={'flex'} className={"monster-list"}>
              {results.map((monster: Monster) => {
                return (
                  <List.Item className={'monster-list-item'} role={'option'} key={monster.monster_id} onClick={() => setMonsterSelected(monster)}>
                    <Paper>
                      {`${monster.level} ${monster.monstertype} ${monster.monstername} (${monster.source})`}
                    </Paper>
                  </List.Item>
                );
              })}
            </List>
          </section>
        </Grid.Col>
        <Grid.Col span={10}>
          <MonsterCard monster={monsterSelected} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
