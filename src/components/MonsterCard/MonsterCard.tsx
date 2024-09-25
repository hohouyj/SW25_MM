import './styles.css';
import { Monster } from "../../types.ts";
import { MonsterSkillCard } from '.';
import Paper from '@mui/material/Paper';

type MonsterPropType = {
  monster: Monster;
};

function MonsterCard({ monster }: MonsterPropType) {
  return (
    <Paper className="monster">
      <div className="monster-card-title">
        <div className="level">{monster.level}</div>
        <div className="name">
          {monster.monstername} ({monster.source})
        </div>
      </div>
      <div className="monster-card-details">
        <div className="row1 row">
          <div>
            <strong>Intelligence:</strong> {monster.intelligence}
          </div>
          <div>
            <strong>Perception:</strong> {monster.perception}
          </div>
          <div>
            <strong>Disposition:</strong> {monster.disposition}
          </div>
          <div>
            <strong>Soulscars:</strong> {monster.soulscars}
          </div>
        </div>
        <div className="row2 row">
          <div>
            <strong>Language:</strong> {monster.language}
          </div>
          <div>
            <strong>Habitat:</strong> {monster.habitat}
          </div>
        </div>
        <div className="row3 row">
          <div>
            <strong>Rep/Weakness:</strong> {monster.reputation}/
            {monster.weakness}
          </div>
          <div>
            <strong>Weak Point:</strong> {monster.weakpoint}
          </div>
        </div>
        <div className="row4 row">
          <div>Initiative: {monster.initiative}</div>
          <div>Movement Speed: {monster.movementspeed}</div>
          <div>
            <strong>Fortitude:</strong> {monster.fortitude} (
            {7 + parseInt(monster.fortitude)})
          </div>
          <div>
            <strong>Willpower:</strong> {monster.fortitude} (
            {7 + parseInt(monster.willpower)})
          </div>
        </div>
      </div>
      <br />
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
          {monster.combatstyles.map((style, idx) => {
            return (
              <tr key={idx}>
                <td>{style.style}</td>
                <td>
                  {style.accuracy} ({7 + parseInt(style.accuracy)})
                </td>
                <td>{style.damage}</td>
                <td>
                  {style.evasion} ({7 + parseInt(style.evasion)})
                </td>
                <td>{style.defense}</td>
                <td>{style.hp}</td>
                <td>{style.mp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

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
