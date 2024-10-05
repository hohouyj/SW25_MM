import "./styles.css";
import { MonsterPropType } from "../../types.ts";
import {
  MonsterCardDetails,
  MonsterSkillCard,
  MonsterCombatStyleTable,
  MonsterLootTable,
} from ".";
import { Container } from "@mantine/core";

function MonsterCard({ monster }: MonsterPropType) {
  return (
    <Container className="monster">
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
    </Container>
  );
}

export default MonsterCard;
