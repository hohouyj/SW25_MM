import { Monster } from "../../types";

type MonsterPropType = {
  monster: Monster;
};

export default function MonsterCardDetails({ monster }: MonsterPropType) {
  return (
    <>
      <div className="monster-card-title">
        <div className="level">
          {monster.level} {monster.monstertype}
        </div>
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
    </>
  );
}
