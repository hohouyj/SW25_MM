import {
    Button,
    Grid,
    Group,
    Modal,
    NumberInput,
    Paper,
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
} from "../../utils/characterStorage";
import { useNavigate } from "react-router-dom";

export default function CharacterManager() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [modalOpened, { open, close }] = useDisclosure(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate()

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
    ] as const;

    const form = useForm<Character>({
        initialValues: defaultCharacter(),
    });

    useEffect(() => {
        setCharacters(getAllCharacters());
    }, []);

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
                                <Table.Td>{Math.max(...LEVEL_KEYS.map((key) => char[key] as number))}</Table.Td>
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
                <form onSubmit={form.onSubmit(handleSave)}>
                    <Grid>
                        <Grid.Col span={12}>
                            <TextInput label="Name" {...form.getInputProps("name")} />
                        </Grid.Col>
                        {LEVEL_KEYS.map((key) => (
                            <Grid.Col span={6} key={key}>
                                <NumberInput
                                    label={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                    min={0}
                                    max={15}
                                    {...form.getInputProps(key)}
                                />
                            </Grid.Col>
                        ))}
                    </Grid>

                    <Button type="submit" fullWidth mt="md">
                        {isEditing ? "Update" : "Save"}
                    </Button>
                </form>
            </Modal>
        </>
    );
}
