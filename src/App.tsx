import { MonsterCard } from "./components/MonsterCard";
import useMonsterSearch from "./hooks/useMonsterSearch";
import { MantineProvider } from "@mantine/core";
// import spellData from "./data/spells.json";

function App() {
  const { query, handleQueryChange, results } = useMonsterSearch();

  return (
    <MantineProvider>
      <label>Monster Name </label>
      <input type="text" value={query} onChange={handleQueryChange} />
      {results.map((monster) => {
        return <MonsterCard monster={monster} key={monster.monster_id} />;
      })}
    </MantineProvider>
  );
}

export default App;
