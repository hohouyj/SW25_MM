import { Spell } from "../../types.ts";
import { Container } from "@mantine/core";
import { ReactNode } from "react";
import "./styles.css";
interface SpellCardProps {
  spell: Spell;
  children?: ReactNode;
}

function SpellCard({ spell,  }: SpellCardProps) {
  return (
    <Container className="spell">
      <pre>{JSON.stringify(spell, null, 2)}</pre>

      <div className="spell-card-header">
        <div>{`${spell.spellname}`}</div>
        <div>{`Level ${spell.level} ${spell.tradition}`}</div>
      </div>
      <div>
        <div>{`${spell.cost}`}</div>
        <div>{`Range: ${spell.rangearea}`}
        </div>
        <div>
          {`Target: ${spell.target}`}
        </div>
        <div>
          {`Resistance: ${spell.resistance}`}
        </div>
        </div>
      <div className="spell-card-body">
        <div dangerouslySetInnerHTML={{ __html: spell.description }}></div>
      </div>
      </Container>
  );
}

export default SpellCard;
