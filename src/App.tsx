import { useState } from "react";
import MonsterCard from "./Monster.tsx";
import monsterData from "./data/monsters.json";
import spellData from "./data/spells.json";

function App() {
  const [monster_id, setMonsterId] = useState(1);
  const [monster, setMonster] = useState(
    monsterData.allmonsters.filter((x) => parseInt(x.monster_id) == 1)[0]
  );
  const handleNewMonsterId = (event) => {
    let val = event?.target.value;
    if (monsterData.allmonsters.find((x) => parseInt(x.monster_id) == val)) {
      setMonsterId(val);
      setMonster(
        monsterData.allmonsters.filter((x) => parseInt(x.monster_id) == val)[0]
      );
    } else {
      setMonsterId(val);
    }
  };

  return (
    <>
      <label>Monster Id </label>
      <input type="number" value={monster_id} onChange={handleNewMonsterId} />
      <MonsterCard monster={monster} />
    </>
  );
}

export default App;
