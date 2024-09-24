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
                  {abilities.title}:{" "}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: abilities.description,
                    }}
                  />
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
      <div>
        <div>
          <div>
            {monster.level} {monster.monstername}
          </div>
        </div>
        <div>
          <div>
            Intelligence: {monster.intelligence} Perception:{" "}
            {monster.perception} Disposition: {monster.disposition} Soulscars:{" "}
            {monster.soulscars}
          </div>
          <div>
            Language: {monster.language} Habitat: {monster.habitat}
          </div>
          <div>
            Rep/Weakness: {monster.reputation}/{monster.weakness} Weak Point:{" "}
            {monster.weakpoint}
          </div>
          <div>
            Initiative: {monster.initiative} Movement Speed:{" "}
            {monster.movementspeed} Fortitude: {monster.fortitude} (
            {7 + parseInt(monster.fortitude)}) Willpower: {monster.fortitude} (
            {7 + parseInt(monster.willpower)})
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
