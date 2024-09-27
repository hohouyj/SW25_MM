import { LootResult } from "../../types";

type MonsterLootTablePropType = {
  loottable: LootResult[];
};

export default function MonsterLootTable({
  loottable,
}: MonsterLootTablePropType) {
  return (
    <div className="monster-card-loot">
      <div className="monster-card-loot-title">Loot</div>
      <div className="monster-card-loot-items">
        {loottable.map((loot, idx) => {
          return (
            <div className="monster-card-loot-item" key={idx}>
              <div className="roll">{loot.roll}</div>
              <div className="loot">{loot.loot}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
