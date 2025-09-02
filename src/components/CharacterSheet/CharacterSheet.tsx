import { useParams } from "react-router-dom";
import { getCharacter, updateCharacter } from "../../utils/characterStorage";
import { useEffect, useState } from "react";
import { Button, Paper, Title, MultiSelect, Group, Box, SimpleGrid, Modal, Grid } from "@mantine/core";
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

    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character | null>(getCharacter(id));
    function getActiveClasses(character: Character | null): string[] {
        if (!character) return []; // fixed the check

        return (Object.entries(character) as [keyof Character, any][])
            .filter(([_, value]) => typeof value === "number" && value > 0)
            .map(([key]) => key.replace("_level", ""));
    }
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
        setCharacter((prev) =>
            prev
                ? {
                    ...prev,
                    feature_ids: [...prev.feature_ids, ...selected.map(Number)],
                }
                : prev
        );
    };
    if (!character) {
        return <Title order={3}>Character not found</Title>;
    }

    return (
        <>
            <Paper shadow="sm" p="md" withBorder radius="md">
                <Title order={2}>Character Sheet: {character.id}</Title>
                <Title order={4} mt="lg">
                    Raw Data
                </Title>
                <pre>{JSON.stringify(character, null, 2)}</pre>
                <SimpleGrid
                    cols={{ base: 1, sm: 2, md: 3 }}
                    spacing="lg"
                    verticalSpacing="md"
                >
                    {activeClasses.map((className) => {
                        const classFeatures = characterFeatures.filter((feature) => getFeaturesByClassName(className).includes(feature.feature_name))
                        console.log(className, classFeatures)
                        return <Box>
                            <Title>{className.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</Title>
                            {classFeatures.map((feature) => {
                                return (<FeatureCard data={feature} config={getConfigForfeature(feature.feature_name)} key={feature.name} />)
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
                opened={modalOpened}
                onClose={close}
                className={modalClassName}
                character={character}
                onSubmit={handleSaveFeatures}
            />;
        </>
    );
}
