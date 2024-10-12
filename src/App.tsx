import { MonsterCard } from "./components/MonsterCard";
import useMonsterSearch from "./hooks/useMonsterSearch";
import { Container } from "@mantine/core";
// import spellData from "./data/spells.json";

function App() {
  const { query, handleQueryChange, results } = useMonsterSearch();

  return (
    <Container>
      <label>Monster Name </label>
      <input type="text" value={query} onChange={handleQueryChange} />
      {results.map((monster) => {
        return <MonsterCard monster={monster} key={monster.monster_id} />;
      })}
    </Container>
  );
}

export default App;

