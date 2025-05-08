import { Container, Grid, TagsInput } from "@mantine/core";
import { Spell } from "../../types";
import './spell_styles.css';
import SpellCard from "../SpellCard/SpellCard";
import useSpellSearch from "../../hooks/useSpellSearch";

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
                        <SpellCard spell={spell} key={spell.spell_id} />
                    );
                  })}
                
            </Grid.Col>
          </Grid>
        </Container>
  );
}
