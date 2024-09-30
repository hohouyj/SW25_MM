import { List, ListItemButton, ListItemText, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MonsterCard from "../MonsterCard";
import monstersJSON from "../../data/monsters.json";
import { Monster } from "../../types";
import { useState } from "react";
import "./styles.css";

export default function () {
  const Monsters = monstersJSON.allmonsters.sort(
    (a, b) => parseInt(a.level) - parseInt(b.level)
  );

  const [monsterSelected, setMonsterSelected] = useState<Monster>(Monsters[0]);

  return (
    <>
      <Grid container spacing={2}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </Grid>
      <Grid container spacing={2}>
        <Grid size={3}>
          <List sx={{ height: "90vh", overflow: "auto" }}>
            {Monsters.map((monster: Monster) => {
              return (
                <ListItemButton onClick={() => setMonsterSelected(monster)}>
                  <ListItemText
                    primary={`${monster.level} ${monster.monstertype} ${monster.monstername} (${monster.source})`}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Grid>
        <Grid size={9}>
          <MonsterCard monster={monsterSelected} />
        </Grid>
      </Grid>
    </>
  );
}
