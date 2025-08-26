import { Container, Grid, TagsInput } from "@mantine/core";
import { Spell } from "../../types";
import useSpellSearch from "../../hooks/useSpellSearch";
import FeatureCard from "../FeatureCard/FeatureCard";
import { spellConfig } from "../FeatureCard/FeatureCardConfigs";

export default function () {
  const { tags, setTags, removeTag, results } = useSpellSearch();

  return (
        <Container fluid>
          <Grid>
            <Grid.Col span={2}>
              <section>
                <TagsInput
                  allowDuplicates
                  value={tags}
                  onChange={setTags}
                  onRemove={removeTag}
                  label="Press Enter to Submit a Search Tag (e.g. fire bolt, level 1, 5mp)"
                  placeholder="Enter tag"
                  clearable
                />
              </section>
            </Grid.Col>
            <Grid.Col span={10}>
                  {results.map((spell: Spell) => {
                    return (
                        <FeatureCard data={{ ...spell, feature_name: "spells" }} key={spell.spell_id} config={spellConfig} />
                    );
                  })}
                
            </Grid.Col>
          </Grid>
        </Container>
  );
}
