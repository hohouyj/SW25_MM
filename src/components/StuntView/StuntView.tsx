import { Container, Grid, TagsInput } from "@mantine/core";
import { Stunt } from "../../types";
import useStuntSearch from "../../hooks/useFuseSearch";
import FeatureCard from "../FeatureCard/FeatureCard";
import { stuntConfig } from "../../configs/FeatureCardConfigs";

export default function () {
  const { tags, setTags, removeTag, results } = useStuntSearch();

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
                  label="Press Enter to Submit a Search Tag"
                  placeholder="Enter tag"
                  clearable
                />
              </section>
            </Grid.Col>
            <Grid.Col span={10}>
                  {results.map((stunt: Stunt) => {
                    return (
                        <FeatureCard data = {stunt} config={stuntConfig} />
                    );
                  })}
                
            </Grid.Col>
          </Grid>
        </Container>
  );
}
