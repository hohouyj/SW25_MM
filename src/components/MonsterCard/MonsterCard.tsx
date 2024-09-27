import "./styles.css";
import { MonsterPropType } from "../../types.ts";
import {
  MonsterCardDetails,
  MonsterSkillCard,
  MonsterCombatStyleTable,
} from ".";
import Paper from "@mui/material/Paper";

function MonsterCard({ monster }: MonsterPropType) {
  return (
    <Paper className="monster">
      <MonsterCardDetails monster={monster} />
      <br />
      <MonsterCombatStyleTable combatstyles={monster.combatstyles} />
      <br />
      <MonsterSkillCard skills={monster.uniqueskills} />
      <br />
      <div className="monster-card-loot">
        <div className="monster-card-loot-title">Loot</div>
        <div className="monster-card-loot-items">
          {monster.loottable.map((loot, idx) => {
            return (
              <div className="monster-card-loot-item" key={idx}>
                <div className="roll">{loot.roll}</div>
                <div className="loot">{loot.loot}</div>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <div
        className="monster-card-description"
        dangerouslySetInnerHTML={{ __html: monster.description }}
      />
    </Paper>
  );
}

export default MonsterCard;
