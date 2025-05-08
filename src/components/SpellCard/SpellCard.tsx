import { Spell } from "../../types.ts";
import { Paper } from "@mantine/core";
import { ReactNode } from "react";
import "./styles.css";
interface SpellCardProps {
  spell: Spell;
  children?: ReactNode;
}

function SpellCard({ spell, }: SpellCardProps) {
  return (
    <Paper className="spell-card">

      <div className="spell-card-header">
        <div className="level">{`${spell.level}`}</div>
        <div className="name">{`${spell.name}`}</div>
        <div className="spell-label">Cost</div>
        <div className="cost">{`${spell.cost}`}</div>
      </div>

      <div className="spell-card-details">
        <div className="detail target">
          <div className="spell-label">
            Tar.
          </div>
          <div>
            {`${spell.target}`}
          </div>
        </div>
        <div className="detail">
          <div className="spell-label">
            Range/Area
          </div>
          <div>
            {`${spell.rangearea}`}
          </div>
        </div>
        <div className="detail">
          <div className="spell-label">
            Duration
          </div>
          <div>
            {`${spell.duration}`}
          </div>
        </div>
        <div className="detail">
          <div className="spell-label">
            Res.
          </div>
          <div>
            {`${spell.resistance}`}
          </div>
        </div>
      </div>

      <div className="spell-card-body">
        <div dangerouslySetInnerHTML={{ __html: spell.description }}></div>
        {spell.power_table && (
          <div className="spell-power-table" dangerouslySetInnerHTML={{ __html: spell.power_table }} />
        )}
      </div>

    </Paper>
  );
}

export default SpellCard;
