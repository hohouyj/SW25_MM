import { FormEvent, useState } from "react";
import MonsterCard from "./Monster.tsx";
import monsterData from "./data/monsters.json";
// import spellData from "./data/spells.json";

function App() {
  const [monsterName, setMonsterName] = useState<string>("Abyss Minions");

  const foundMonster = monsterData.allmonsters.filter((x) => {
    return x.monstername.toLowerCase().includes(monsterName.toLowerCase());
  });

  const handleNewMonsterName = (event: FormEvent<HTMLInputElement>) => {
    console.log(event.type);
    let val = event.currentTarget.value;
    setMonsterName(val);
  };

  return (
    <>
      <label>Monster Name </label>
      <input type="text" value={monsterName} onChange={handleNewMonsterName} />
      {foundMonster.map((monster) => {
        return <MonsterCard monster={monster} key={monster.monster_id} />;
      })}
    </>
  );
}

export default App;
