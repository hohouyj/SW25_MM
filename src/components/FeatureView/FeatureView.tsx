import { Container, Grid, TagsInput } from "@mantine/core";
import useFeatureSearch from "../../hooks/useFeatureSearch";
import FeatureCard from "../FeatureCard/FeatureCard";
import { getConfigForfeature } from "../FeatureCard/FeatureCardConfigs";

export default function () {
  const { tags, setTags, removeTag, results } = useFeatureSearch();

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
          {results.map((feature) => {
            return (
              <FeatureCard data={feature} config={
                getConfigForfeature(feature.feature_name)
              } key={feature.name} />
            );
          })}

        </Grid.Col>
      </Grid>
    </Container>
  );
}
