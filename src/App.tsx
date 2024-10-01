import { FormEvent, useState } from "react";
import { MonsterCard } from "./components/MonsterCard";
import monsterData from "./data/monsters.json";
import { Container, MantineProvider } from "@mantine/core";
// import spellData from "./data/spells.json";

function App() {
  const [monsterName, setMonsterName] = useState<string>("Abyss Minions");

  const foundMonster = monsterData.allmonsters.filter((x) => {
    return x.monstername.toLowerCase().includes(monsterName.toLowerCase());
  });

  const handleNewMonsterName = (event: FormEvent<HTMLInputElement>) => {
    let val = event.currentTarget.value;
    setMonsterName(val);
  };

  return (
    <MantineProvider>
      <label>Monster Name </label>
      <input type="text" value={monsterName} onChange={handleNewMonsterName} />
      <Container>
        {foundMonster.map((monster) => {
          return <MonsterCard monster={monster} key={monster.monster_id} />;
        })}
      </Container>
    </MantineProvider>
  );
}

export default App;
