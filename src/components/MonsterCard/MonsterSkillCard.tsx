import './styles.css';
import { MonsterSkill } from "../../types";

type MonsterSkillPropType = {
  skills: MonsterSkill[];
};

export default function MonsterSkillCard({ skills }: MonsterSkillPropType) {
  return (
    <div className="monster-card-skills">
      {skills.map((skill, idx) => {
        return (
          <div className="monster-card-skill-section" key={idx}>
            <div>{skill.section}</div>
            {skill.abilities.map((abilities, idx) => {
              return (
                <div className="monster-card-skill" key={idx}>
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