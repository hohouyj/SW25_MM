import { useParams } from "react-router-dom";
import { getActiveClasses, getCharacter, saveCharacters, updateCharacter } from "../../utils/characterStorage";
import { useEffect, useState } from "react";
import { Button, Paper, Title, MultiSelect, Group, Box, SimpleGrid, Modal, Grid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Character } from "../../types";
import { notifications } from "@mantine/notifications";
import { getAvailableFeaturesByClassAndLevel, getFeaturesByClassName, getFeaturesById } from "../../utils/characterFeatureQuery";
import { getConfigForfeature } from "../FeatureCard/FeatureCardConfigs";
import FeatureCard from "../FeatureCard/FeatureCard";
import { useDisclosure } from "@mantine/hooks";
import { FeatureSelectModal } from "./FeatureSelectModal";

export default function CharacterSheet() {
    const [modalOpened, { open, close }] = useDisclosure(false);
    const [modalClassName, setModalClassName] = useState("Bard")
    const [expanded, setExpanded] = useState<string | number | null>(null);

    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character | null>(getCharacter(id));

    function getClassLevel(className: string, character: Character) {
        const classLevelKey = `${className}_level` as keyof Character;
        return character[classLevelKey] as number;
    }



    const characterFeatures = getFeaturesById(character?.feature_ids)
    const activeClasses = getActiveClasses(character)

    const form = useForm<Character>({
        initialValues: character as Character,
    });
    const handleEdit = (character: Character, className: string) => {
        form.setValues(character);
        setModalClassName(className)
        open();
    };
    const handleSaveFeatures = (selected: string[]) => {
        setCharacter((prev) => {
            if (!prev) return prev;

            const updated = {
                ...prev,
                feature_ids: [...prev.feature_ids, ...selected.map(Number)],
            };

            updateCharacter(updated); // persist the updated character
            return updated; // update state
        });
    };
    if (!character) {
        return <Title order={3}>Character not found</Title>;
    }

    return (
        <>
            <Paper shadow="sm" p="md" withBorder radius="md">
                <Title order={2}>{character.name}</Title>
                
                <SimpleGrid
                    cols={{ base: 1, sm: 2, md: 3 }}
                    spacing="lg"
                    verticalSpacing="md"
                >
                    {activeClasses.map((className) => {
                        const classFeatures = characterFeatures.filter((feature) => getFeaturesByClassName(className).includes(feature.feature_name))
                        console.log(className, classFeatures)
                        return <Box>
                            <Title size="lg">{className.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</Title>
                            {classFeatures.map((feature) => {
                                const isExpanded = expanded === feature.id;

                                return (
                                    <Box key={feature.id} mb="sm" pos="relative">
                                        <Button
                                            size="xs"
                                            variant="subtle"
                                            style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                                            onClick={() =>
                                                setExpanded(isExpanded ? null : feature.id)
                                            }
                                        >
                                            {isExpanded ? 'Close' : 'Open'}
                                        </Button>

                                        {isExpanded ? (
                                            <FeatureCard data={feature} config={getConfigForfeature(feature.feature_name)} key={feature.name} />)
                                            : (
                                                <Paper withBorder p="sm" radius="md" style={{ cursor: 'pointer' }}>
                                                    <Text fw={500}>
                                                        {feature.name}
                                                    </Text>
                                                    <Text size="sm" c="dimmed">
                                                        {feature.description}
                                                    </Text>
                                                </Paper>
                                            )}
                                    </Box>
                                )
                            })
                            }
                            {classFeatures.length < getClassLevel(className, character) &&
                                <Button fullWidth onClick={() => handleEdit(character, className)}>
                                    Add {className.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} Feature
                                </Button>
                            }
                        </Box>
                    })
                    }</SimpleGrid>
            </Paper>
            <FeatureSelectModal
                key={`${character.id}-${modalClassName}`}
                opened={modalOpened}
                onClose={close}
                className={modalClassName}
                character={character}
                onSubmit={handleSaveFeatures}
            />
        </>
    );
}
