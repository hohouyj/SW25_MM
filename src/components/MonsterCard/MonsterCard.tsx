import "./styles.css";
import { MonsterPropType } from "../../types.ts";
import {
  MonsterCardDetails,
  MonsterSkillCard,
  MonsterCombatStyleTable,
  MonsterLootTable,
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
      <MonsterLootTable loottable={monster.loottable} />
      <br />
      <div
        className="monster-card-description"
        dangerouslySetInnerHTML={{ __html: monster.description }}
      />
    </Paper>
  );
}

export default MonsterCard;
