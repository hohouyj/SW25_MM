import { CombatStyle } from "../../types";

type MonsterCombatStylesPropType = {
  combatstyles: CombatStyle[];
};

export default function MonsterCombatStyleTable({
  combatstyles,
}: MonsterCombatStylesPropType) {
  return (
    <table className="monster-card-combat-style-table">
      <thead>
        <tr>
          <th>Fight Style (section)</th>
          <th>Accuracy</th>
          <th>Damage</th>
          <th>Evasion</th>
          <th>Defense</th>
          <th>HP</th>
          <th>MP</th>
        </tr>
      </thead>
      <tbody className="monster-card-combat-style-body">
        {combatstyles.map((style, idx) => {
          return (
            <tr key={idx}>
              <td>{style.style}</td>
              <td>
                {style.accuracy}{" "}
                {parseInt(style.accuracy)
                  ? "(" + (7 + parseInt(style.accuracy)) + ")"
                  : ""}
              </td>
              <td>{style.damage}</td>
              <td>
                {style.evasion}{" "}
                {parseInt(style.accuracy)
                  ? "(" + (7 + parseInt(style.accuracy)) + ")"
                  : ""}
              </td>
              <td>{style.defense}</td>
              <td>{style.hp}</td>
              <td>{style.mp}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
