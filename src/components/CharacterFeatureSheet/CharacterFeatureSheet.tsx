import { useParams } from "react-router-dom";
import { getActiveClasses, getAdventurerLevel, getCharacter, getPassiveClasses, updateCharacter } from "../../utils/characterStorage";
import { useMemo, useState } from "react";
import { Button, Paper, Title, Box, SimpleGrid, Text, Flex, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Character } from "../../types";
import { notifications } from "@mantine/notifications";
import { getAllFeatureIdsByClassAndLevel, getAutoFeaturesByLevel, getFeaturesByClassName, getFeaturesById, getSelectableFeatureIdsByLevel } from "../../utils/characterFeatureQuery";
import { getConfigForfeature } from "../FeatureCard/FeatureCardConfigs";
import FeatureCard from "../FeatureCard/FeatureCard";
import { useDisclosure } from "@mantine/hooks";
import { FeatureSelectModal } from "./FeatureSelectModal";
import { IconPencil } from "@tabler/icons-react";

export default function CharacterFeatureSheet() {
    const iconSize = 20;
    const [modalOpened, { open, close }] = useDisclosure(false);
    const [modalClassName, setModalClassName] = useState("Bard")
    const [expanded, setExpanded] = useState<string | number | null>(null);

    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character | null>(getCharacter(id));

    function getDisplayName(str: string) {
        return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    }

    function getClassLevel(className: string, character: Character) {
        if (className === "selected_features") return getAdventurerLevel(character)
        const classLevelKey = `${className}_level` as keyof Character;
        return character[classLevelKey] as number;
    }

    const characterFeatures = useMemo(() => {
        return getFeaturesById(character?.feature_ids);
    }, [character]);

    const activeClasses = getActiveClasses(character)
    const passiveClasses = getPassiveClasses(character)

    const form = useForm<Character>({
        initialValues: character as Character,
    });

    const handleEdit = (character: Character, className: string) => {
        form.setValues(character);
        setModalClassName(className)
        open();
    };

    const handleSaveFeatures = (selected: string[], className: string, classLevel: number) => {
        if (className === "selected_features") {
            notifications.show({ title: "Updated", message: "Adventurer features was updated.", color: "green", });
            setCharacter((prev) => {
                if (!prev) return prev;
                const classFeatureIds = getSelectableFeatureIdsByLevel(classLevel);
                const preservedIds = prev.feature_ids.filter((id) => !classFeatureIds.includes(id));
                const updated = { ...prev, feature_ids: [...preservedIds, ...selected.map(Number)], };
                updateCharacter(updated);
                return updated;
            });
        }
        else {
            notifications.show({ title: "Updated", message: `${getDisplayName(className)} features was updated.`, color: "green", });
            setCharacter((prev) => {
                if (!prev) return prev;
                const classFeatureIds = getAllFeatureIdsByClassAndLevel(className, classLevel);
                const preservedIds = prev.feature_ids.filter((id) => !classFeatureIds.includes(id));
                const updated = { ...prev, feature_ids: [...preservedIds, ...selected.map(Number)], };
                updateCharacter(updated);
                return updated;
            });
        }
    };

    if (!character) {
        return <Title order={3}>Character not found</Title>;
    }

    return (
        <>
            <Flex align="center" mb="sm">
                <Title order={2}>Adventurer {getAdventurerLevel(character)}</Title>

                <ActionIcon
                    variant="subtle"
                    size="sm"
                    onClick={() => handleEdit(character, "selected_features")}
                >
                    <IconPencil size={iconSize} />
                </ActionIcon>
            </Flex>
            <Flex wrap="wrap" align="center" justify="center" gap="md">
                {
                    characterFeatures.filter(f => f.feature_name === "selected_features").length === 0 ? (
                        <Text>No Features Selected</Text>
                    ) : (
                        characterFeatures.filter(
                            (feature) => "selected_features" === feature.feature_name
                        ).map(
                            (feature) => {
                                const isExpanded = expanded === feature.id;
                                return (
                                    <Box key={feature.id}
                                        mb="sm"
                                        pos="relative"
                                        style={{ flex: 1, minWidth: 500 }}>
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
                                                <Paper withBorder p="sm" radius="md">
                                                    <Text fw={500}>
                                                        {feature.name}
                                                    </Text>
                                                </Paper>
                                            )}
                                    </Box>
                                )
                            }
                        )
                    )}
            </Flex>

            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing="lg"
                verticalSpacing="xs"
            >
                {passiveClasses.sort((className) => getClassLevel(className, character)).map(
                    (className) => {
                        const classLevelKey = `${className}_level` as keyof Character;
                        const classLevel = character[classLevelKey] as number;
                        const autoClassFeatures = getAutoFeaturesByLevel(className, classLevel)
                        if (autoClassFeatures.length == 0) return
                        return <Box>
                            <Title order={2} mb="sm" >{getDisplayName(className) + " " + classLevel}</Title>
                            {autoClassFeatures.map((feature) => {
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
                                            <FeatureCard data={feature} config={getConfigForfeature("class_features")} key={feature.name} />)
                                            : (
                                                <Paper withBorder p="sm" radius="md">
                                                    <Text fw={500}>
                                                        {feature.name}
                                                    </Text>
                                                </Paper>
                                            )}
                                    </Box>
                                )
                            })
                            }
                        </Box>
                    }
                )}
            </SimpleGrid>

            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing="lg"
                verticalSpacing="md"
            >
                {activeClasses.sort((className) => getClassLevel(className, character)).map((className) => {
                    const classFeatures = characterFeatures.filter((feature) => getFeaturesByClassName(className).includes(feature.feature_name))
                    return <Box>
                        <Flex align="center" mb="sm">
                            <Title order={2} mb="sm" style={{ margin: 0 }}>{getDisplayName(className) + " " + getClassLevel(className, character)}</Title>

                            <ActionIcon
                                variant="subtle"
                                size="md"
                                onClick={() => handleEdit(character, className)}
                            >
                                <IconPencil size={iconSize} />
                            </ActionIcon>
                        </Flex>
                        {
                            classFeatures.length === 0 ? (
                                <Text>No Features Selected</Text>
                            ) : (classFeatures.map((feature) => {
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
                                                <Paper withBorder p="sm" radius="md">
                                                    <Text fw={500}>
                                                        {feature.name}
                                                    </Text>
                                                </Paper>
                                            )}
                                    </Box>
                                )
                            })
                            )}
                    </Box>
                })}
            </SimpleGrid>

            <FeatureSelectModal
                key={`${character.id}-${modalClassName}`}
                opened={modalOpened}
                onClose={close}
                className={modalClassName}
                character={character}
                onSubmit={(selected) => {
                    const level = getClassLevel(modalClassName, character);
                    handleSaveFeatures(selected, modalClassName, level); // adapt to your signature
                }}
            />
        </>
    );
}
