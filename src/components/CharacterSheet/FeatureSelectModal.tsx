import { useState } from 'react';
import { Modal, Button, MultiSelect } from '@mantine/core';
import { Character } from '../../types';
import { getAvailableFeaturesByClassAndLevel } from '../../utils/characterFeatureQuery';


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
  const [selected, setSelected] = useState<string[]>([]);

  // derive class level key dynamically
  const classLevelKey = `${className}_level` as keyof Character;
  const classLevel = character[classLevelKey] as number;

  // fetch available features
  const features = getAvailableFeaturesByClassAndLevel(
    className,
    classLevel
  );

  const data = features.map((f) => ({
    value: String(f.id),
    label: f.name,
  }));

  return (
    <Modal opened={opened} onClose={onClose} title={`Select ${className} Features`}>
      <MultiSelect
        label="Available Features"
        placeholder="Pick features"
        data={data}
        value={selected}
        onChange={setSelected}
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
