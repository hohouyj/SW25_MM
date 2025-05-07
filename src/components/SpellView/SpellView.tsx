import { List } from "@mantine/core";
import spellsJson from "../../data/spells.json";
import { Spell } from "../../types";
import './spell_styles.css';
import SpellCard from "../SpellCard/SpellCard";

export default function () {
  const spells = spellsJson.spells;
  return (
    <List display={"flex"} className={"spell-list"}>
      {spells.map((spell: Spell) => {
        return (
            <SpellCard spell={spell} />
        );
      })}
    </List>
  );
}
