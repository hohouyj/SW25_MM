import { useState } from "react";
import { Modal, Button, MultiSelect } from "@mantine/core";
import { Character } from "../../types";
import {
  getAvailableFeaturesByClassAndLevel,
  getSelectableFeaturesByLevel,
} from "../../utils/characterFeatureQuery";
import { getAdventurerLevel } from "../../utils/characterStorage";

interface FeatureSelectModalProps {
  opened: boolean;
  onClose: () => void;
  className: string;
  character: Character;
  onSubmit: (selected: string[]) => void;
}

export function FeatureSelectModal({
  opened,
  onClose,
  className,
  character,
  onSubmit,
}: FeatureSelectModalProps) {


  const classLevelKey = `${className}_level` as keyof Character;
  let classLevel = character[classLevelKey] as number;
  let maxFeatures = classLevel;
  let features = getAvailableFeaturesByClassAndLevel(className, classLevel);

  if(className === "selected_features"){
    classLevel = getAdventurerLevel(character)
    maxFeatures = Math.floor((classLevel+1)/2)
    features = getSelectableFeaturesByLevel(classLevel)
  }

  // map to Mantine MultiSelect data format
  const data = features.map((f) => ({
    value: String(f.id),
    label: f.name,
  }));

  // selected = intersection of character.feature_ids and available features
  const [selected, setSelected] = useState<string[]>(
    data
      .filter((f) => character.feature_ids.map(String).includes(f.value))
      .map((f) => f.value)
  );

  return (
    <Modal opened={opened} onClose={onClose} title={`Select ${className} Features`}>
      <MultiSelect
        label={`${maxFeatures - selected.length} Available Feature(s)`}
        placeholder="Pick features"
        data={
          selected.length >= maxFeatures
            ? data.filter((item) => selected.includes(item.value)) // freeze at cap
            : data
        }
        value={selected}
        onChange={(values) => {
          if (values.length <= maxFeatures) {
            setSelected(values);
          }
        }}
        searchable
        clearable
      />

      <Button
        fullWidth
        mt="md"
        onClick={() => {
          onSubmit(selected);
          onClose();
        }}
      >
        Save
      </Button>
    </Modal>
  );
}
