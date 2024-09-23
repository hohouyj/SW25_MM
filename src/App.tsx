import { useState } from "react";
import MonsterSkills from "./MonsterSkills";
// import monsterData from "./data/monsters.json";
import spellData from "./data/spells.json";
import { Monster } from "./types.ts";

function App() {
  const [count, setCount] = useState(0);
  let monsterData = {
    monster_id: "1",
    monstername: "Abyss Minions",
    level: "4",
    monstertype: "Daemon",
    intelligence: "Average",
    perception: "Five senses (Darkvision)",
    disposition: "Hostile",
    soulscars: "0",
    language: "Daemonic",
    habitat: "Shallow Abysses",
    reputation: "11",
    weakness: "14",
    weakpoint: "Accuracy +1",
    initiative: "11",
    movementspeed: "-/14(Flying)",
    fortitude: "6",
    willpower: "6",
    source: "CR III p. 413",
    sections: "2 (Right / Left)",
    mainsection: "None",
    description:
      "<p>These minions are seen flying around in the sky, mainly in Shallow Abysses.</p><p>They look like two small, winged child-like Daemons connected by their long intertwined tails. The two are never separated and are therefore considered a single Daemon. Their consciousnesses seem to be completely synchronized, and their coordinated attacks are as threatening as those of a skilled swordsman with two swords.</p><p>There have been reports of seeing three or more bodies connected by a tail, but the possibility of misidentification or assumption has not been ruled out, and the information has yet to be confirmed.</p>",
    uniqueskills: [
      {
        section: "All Sections",
        abilities: [
          {
            title: "◯Flight",
            description:
              "<p>Abyss Minions receive a +1 bonus to Accuracy and Evasion only for melee attacks.</p>",
          },
          {
            title: "◯Twin Daemons",
            description:
              '<p>At first glance, the Right and Left sections are indistinguishable. If the character performs a melee attack, a ranged attack, or a "Target: 1 Character" spell or effect on one of these sections, roll 1d. If the result is 1- 2, the opposite section, which is different from the targeted section, will be affected. If both sections are targeted at the same time, this effect does not occur.</p><p>This ability is lost when the HP of either Right of Left sections falls to 1 or less.</p>',
          },
          {
            title: "►Cross Strike/7 (14)/Evasion/Negates",
            description:
              "<p>It attacks 1 character with a melee attack from both sections simultaneously, dealing 2d+10 physical damage.</p><p>This ability cannot be used when a Major Action has been completed for either its Right of Left section. Also, if it uses this ability, the Major Action of both sections will be completed.</p>",
          },
        ],
      },
    ],
    combatstyles: [
      {
        style: "Spear (Right)",
        accuracy: "6",
        damage: "2d+5",
        evasion: "6",
        defense: "4",
        hp: "32",
        mp: "15",
      },
      {
        style: "Spear (Left)",
        accuracy: "6",
        damage: "2d+5",
        evasion: "6",
        defense: "4",
        hp: "32",
        mp: "15",
      },
    ],
    loottable: [
      {
        roll: "Always",
        loot: "Daemon's Blood (100G/Red A)",
      },
      {
        roll: "2 - 9",
        loot: "None",
      },
      {
        roll: "10+",
        loot: "Dirty Weapons (300G/Black White A)",
      },
    ],
  };
  return (
    <>
      <MonsterSkills monster={monsterData} />
      <h1>Vite + React</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <pre>{JSON.stringify(monsterData, null, 2)}</pre>
    </>
  );
}

export default App;
