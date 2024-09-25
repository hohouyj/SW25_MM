import { Monster, MonsterSkill } from "./types.ts";

type MonsterPropType = {
  monster: Monster;
};

type MonsterSkillPropType = {
  skills: MonsterSkill[];
};

function MonsterSkillCard({ skills }: MonsterSkillPropType) {
  return (
    <div className="monster-card-skills">
      {skills.map((skill) => {
        return (
          <div className="monster-card-skill-section">
            <div>{skill.section}</div>
            {skill.abilities.map((abilities) => {
              return (
                <div className="monster-card-skill">
                  <strong>{abilities.title}</strong>
                  <div
                    dangerouslySetInnerHTML={{ __html: abilities.description }}
                  ></div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function MonsterCard({ monster }: MonsterPropType) {
  return (
    <>
      <div className="monster">
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
            {monster.combatstyles.map((style) => {
              return (
                <tr key={style.style}>
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
            {monster.loottable.map((loot) => {
              return (
                <div className="monster-card-loot-item">
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
      </div>
    </>
  );
}

export default MonsterCard;
