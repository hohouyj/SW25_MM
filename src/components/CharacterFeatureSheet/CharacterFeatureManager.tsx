import {
    Button,
    Grid,
    Group,
    Modal,
    MultiSelect,
    NumberInput,
    Paper,
    Select,
    Table,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";

import { Character } from "../../types";

import {
    addCharacter,
    deleteCharacter,
    getAllCharacters,
    updateCharacter,
    defaultCharacter,
    getAdventurerLevel,
} from "../../utils/characterStorage";
import { useNavigate } from "react-router-dom";

export default function CharacterFeatureManager() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [modalOpened, { open, close }] = useDisclosure(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const navigate = useNavigate()

    const DIVINITY_OPTIONS = [
        "Lyphos, Divine Ancestor",
        "Gurvazo, Trap Lord",
        "Grendal, Blazing Emperor",
        "Meigal, Fraud God",
        "Strasford, God of Railroads",
        "Miritsa, Goddess of Love and Vengeance",
        "Dalion, God of Trees",
        "Kilhia, God of Wisdom",
        "Dreven, Magic Hunter King",
        "Sien, Goddess of the Moon",
        "Gamel, God of Money",
        "Sadur, Wandering God",
        "Myles, Divine Chef",
        "Asteria, Goddess of Fairies",
        "Dalkhrem, God of War",
        "Yuliskaroa, Goddess of Victory",
        "Dovruk, God of Drunken Ecstasy",
        "Harula, Guiding Star",
        "Paro, Divine Herald",
        "Tidan, God of the Sun",
        "Aurmata, Armored Goddess",
        "Eiryak, Sea Snatcher",
        "Zoras-Valles, Earth Storm",
        "Nivaceps, Blood-bathing Goddess",
        "Zaargias, God of Death",
        "Zeides, Immortal Queen",
        "Laris, Mad God",
        "Eve, Shield Against the Abyss",
        "Adeni, Weaver of Threads",
        "Furusil, Goddess of Wind and Rain",
        "Kaggu, Martial Fairy",
        "Mirtabar, Divine Hand"
    ];
    const FAIRY_MAGIC_OPTIONS = ['Basic', 'Dark', 'Earth', 'Fire', 'Light', 'Special', 'Water/Ice', 'Wind'];
    const LEVEL_KEYS = [
        "alchemist_level",
        "bard_level",
        "dark_hunter_level",
        "enhancer_level",
        "geomancer_level",
        "tactician_level",
        "rider_level",
        "ranger_level",
        "sage_level",
        "scout_level",
        "battle_dancer_level",
        "fencer_level",
        "fighter_level",
        "grappler_level",
        "marksman_level",
        "abyssal_magic_level",
        "deep_magic_level",
        "divine_level",
        "fairy_magic_level",
        "magitech_level",
        "nature_level",
        "spiritualism_level",
        "summoning_arts_level",
        "truespeech_level",
    ] as const;
    const CLASS_OPTIONS = LEVEL_KEYS.map((key) => ({
        value: key,
        label: key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
    }));

    const form = useForm<Character>({
        initialValues: defaultCharacter(),
    });

    useEffect(() => {
        setCharacters(getAllCharacters());
    }, []);

    useEffect(() => {
        if (modalOpened) {
            const active = LEVEL_KEYS.filter((k) => form.values[k] > 0);
            setSelectedClasses(active);
        }
    }, [modalOpened, form.values.id]);

    const handleSave = (values: Character) => {
        if (isEditing) {
            updateCharacter(values);
            notifications.show({
                title: "Updated",
                message: `${values.name} was updated.`,
                color: "blue",
            });
        } else {
            addCharacter(values);
            notifications.show({
                title: "Added",
                message: `${values.name} was added.`,
                color: "green",
            });
        }
        setCharacters(getAllCharacters());
        close();
    };

    const handleEdit = (character: Character) => {
        form.setValues(character);
        setIsEditing(true);
        open();
    };

    const handleDelete = (id: string) => {
        deleteCharacter(id);
        setCharacters(getAllCharacters());
        notifications.show({
            title: "Deleted",
            message: `Character deleted.`,
            color: "red",
        });
    };

    const openCharacterSheet = (id: string) => {
        navigate("/charactersheet/" + id)
    }

    return (
        <>
            <Group justify="space-between" mb="md">
                <h2>Characters</h2>
                <Button
                    onClick={() => {
                        form.setValues(defaultCharacter());
                        setIsEditing(false);
                        open();
                    }}
                >
                    Add Character
                </Button>
            </Group>

            <Paper shadow="xs" p="md" withBorder>
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Adventurer Level</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {characters.map((char) => (
                            <Table.Tr key={char.id}>
                                <Table.Td>{char.id.slice(0, 8)}</Table.Td>
                                <Table.Td>{char.name}</Table.Td>
                                <Table.Td>{getAdventurerLevel(char)}</Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        <Button size="xs" color="green" onClick={() => openCharacterSheet(char.id)}>
                                            Character Sheet
                                        </Button>
                                        <Button size="xs" onClick={() => handleEdit(char)}>
                                            Edit
                                        </Button>
                                        <Button size="xs" color="red" onClick={() => handleDelete(char.id)}>
                                            Delete
                                        </Button>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Paper>

            <Modal
                opened={modalOpened}
                onClose={close}
                title={isEditing ? "Edit Character" : "Add Character"}
                size="xl"
            >
                <form
                    onSubmit={form.onSubmit((values) => {
                        // reset unselected fields
                        LEVEL_KEYS.forEach((k) => {
                            if (!selectedClasses.includes(k)) values[k] = 0;
                        });
                        handleSave(values);
                    })}
                >
                    <Grid>
                        {/* Identity */}
                        <Grid.Col span={12}>
                            <TextInput label="Name" {...form.getInputProps("name")} />
                        </Grid.Col>

                        {/* Classes */}
                        <Grid.Col span={12}>
                            <MultiSelect
                                label="Classes"
                                placeholder="Select classes"
                                data={CLASS_OPTIONS}
                                value={selectedClasses}
                                onChange={(newSelection) => {
                                    selectedClasses.forEach((k) => {
                                        if (!newSelection.includes(k)) form.setFieldValue(k, 0);
                                    });
                                    setSelectedClasses(newSelection);
                                }}
                                searchable
                                clearable
                            />
                        </Grid.Col>
                        {selectedClasses.map((key) => (
                            <Grid.Col span={6} key={key}>
                                <NumberInput
                                    label={CLASS_OPTIONS.find((c) => c.value === key)?.label}
                                    min={0}
                                    max={15}
                                    {...form.getInputProps(key)}
                                />
                            </Grid.Col>
                        ))}

                        {/* Divinity */}
                        <Grid.Col span={6}>
                            <Select
                                label="Divinity"
                                placeholder="Choose divinity"
                                data={DIVINITY_OPTIONS}
                                {...form.getInputProps("divinity")}
                                searchable
                                clearable
                            />
                        </Grid.Col>

                        {/* Fairy magic types */}
                        <Grid.Col span={12}>
                            <MultiSelect
                                label="Fairy Magic Types"
                                placeholder="Choose fairy types"
                                data={FAIRY_MAGIC_OPTIONS}
                                {...form.getInputProps("fairy_magic_types")}
                                searchable
                                clearable
                            />
                        </Grid.Col>
                    </Grid>

                    <Button type="submit" fullWidth mt="md">
                        {isEditing ? "Update" : "Save"}
                    </Button>
                </form>
            </Modal>
        </>
    );
}
