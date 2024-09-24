import { Monster, MonsterSkill } from "./types.ts";

type MonsterPropType = {
  monster: Monster;
};

type MonsterSkillPropType = {
  skills: MonsterSkill[];
};

function MonsterSkillCard({ skills }: MonsterSkillPropType) {
  return (
    <div>
      {skills.map((skill) => {
        return (
          <>
            <div>{skill.section}</div>{" "}
            {skill.abilities.map((abilities) => {
              return (
                <div>
                  {abilities.title}: {abilities.description}
                </div>
              );
            })}
          </>
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
          <div className="name">{monster.monstername}</div>
        </div>
        <div className="monster-card-details">
          <div className="row">
            <div>Intelligence: {monster.intelligence}</div>
            <div>Perception: {monster.perception}</div>
            <div>Disposition: {monster.disposition}</div>
            <div>Soulscars: {monster.soulscars}</div>
          </div>
          <div className="row">
            <div>Language: {monster.language}</div>
            <div>Habitat: {monster.habitat}</div>
          </div>
          <div className="row">
            <div>
              Rep/Weakness: {monster.reputation}/{monster.weakness}
            </div>
            <div>Weak Point: {monster.weakpoint}</div>
          </div>
          <div className="row">
            <div>Initiative: {monster.initiative}</div>
            <div>Movement Speed: {monster.movementspeed}</div>
            <div>
              Fortitude: {monster.fortitude} ({7 + parseInt(monster.fortitude)})
            </div>
            <div>
              Willpower: {monster.fortitude} ({7 + parseInt(monster.willpower)})
            </div>
          </div>
        </div>
        <div>
          <div>Fight. Style (section) Accurcy Damage Evasion Defense HP MP</div>
          {monster.combatstyles.map((style) => {
            return (
              <div>
                {style.style} {style.accuracy}({7 + parseInt(style.accuracy)}){" "}
                {style.evasion}({7 + parseInt(style.evasion)}) {style.defense}{" "}
                {style.hp} {style.mp}
              </div>
            );
          })}
        </div>
        <div>
          <MonsterSkillCard skills={monster.uniqueskills} />
        </div>
      </div>
    </>
  );
}

export default MonsterCard;
