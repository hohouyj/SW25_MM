import { Monster } from "./types.ts";

type MonsterPropType = {
  monster: Monster;
};

function MonsterSkills({ monster }: MonsterPropType) {
  return (
    <>
      <h1>{monster.monstername}</h1>
      <ul>{monster.monster_id}</ul>
    </>
  );
}

export default MonsterSkills;
