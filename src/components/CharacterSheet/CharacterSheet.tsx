import { useParams } from "react-router-dom";
import { getActiveClasses, getAdventurerLevel, getCharacter, getPassiveClasses, updateCharacter } from "../../utils/characterStorage";
import { useMemo, useState } from "react";
import { Button, Paper, Title, Box, SimpleGrid, Text, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Character } from "../../types";
import { notifications } from "@mantine/notifications";
import { getAllFeatureIdsByClassAndLevel, getAutoFeaturesByLevel, getFeaturesByClassName, getFeaturesById, getSelectableFeatureIdsByLevel } from "../../utils/characterFeatureQuery";
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

    function getDisplayName(str: string) {
        return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    }

    function getClassLevel(className: string, character: Character) {
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
            <Paper shadow="sm" p="md" withBorder radius="md">
                <Title order={1} mb="sm">{character.name}</Title>


                <Title order={2} mb="sm">Adventurer {getAdventurerLevel(character)}</Title>
                <Flex wrap="wrap" align="center" justify="center" gap="md">
                    {
                        characterFeatures.filter(
                            (feature) => "selected_features" === feature.feature_name
                        ).map(
                            (feature) => {
                                console.log(characterFeatures)
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
                                                <Paper withBorder p="sm" radius="md" style={{ cursor: 'pointer' }}>
                                                    <Text fw={500}>
                                                        {feature.name}
                                                    </Text>
                                                </Paper>
                                            )}
                                    </Box>
                                )
                            }
                        )

                    }
                    {
                        <Button fullWidth onClick={() => handleEdit(character, "selected_features")}>
                            Edit Adventurer Features
                        </Button>
                    }
                </Flex>

                <SimpleGrid
                    cols={{ base: 1, sm: 2, md: 3 }}
                    spacing="lg"
                    verticalSpacing="md"
                >


                    {passiveClasses.sort((className) => getClassLevel(className, character)).map(
                        (className) => {
                            const classLevelKey = `${className}_level` as keyof Character;
                            const classLevel = character[classLevelKey] as number;
                            const autoClassFeatures = getAutoFeaturesByLevel(className, classLevel)
                            console.log(className, autoClassFeatures)
                            if (autoClassFeatures.length == 0) return
                            return <Box>
                                <Title order={2} mb="sm">{getDisplayName(className)+" "+classLevel}</Title>
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
                                                    <Paper withBorder p="sm" radius="md" style={{ cursor: 'pointer' }}>
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
                            <Title order={2} mb="sm">{getDisplayName(className)+ " "+getClassLevel(className, character)}</Title>
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
                                                </Paper>
                                            )}
                                    </Box>
                                )
                            })
                            }
                            {/* {classFeatures.length < getClassLevel(className, character) && */
                                <Button fullWidth onClick={() => handleEdit(character, className)}>
                                    Edit {getDisplayName(className)} Features
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
                onSubmit={(selected) => {
                    const level = getClassLevel(modalClassName, character);
                    handleSaveFeatures(selected, modalClassName, level); // adapt to your signature
                }}
            />
        </>
    );
}
