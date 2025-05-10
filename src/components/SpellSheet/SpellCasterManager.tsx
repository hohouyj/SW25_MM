import {
    Button,
    Table,
    TextInput,
    NumberInput,
    Modal,
    Group,
    Paper,
    Grid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { v4 as uuidv4 } from "uuid";

import {
    getAllSpellCasters,
    addSpellCaster,
    updateSpellCaster,
    deleteSpellCaster,
} from "../../utils/spellCasterStorage";
import { SpellCaster } from "../../types";

function defaultSpellCaster(): SpellCaster {
    return {
        id: uuidv4(),
        name: "",
        abyssal_magic_level: 0,
        deep_magic_level: 0,
        divine_level: 0,
        divinity: "",
        fairy_magic_level: 0,
        magitech_level: 0,
        nature_level: 0,
        spiritualism_level: 0,
        summoning_arts_level: 0,
        truespeech_level: 0,
    };
}

export default function SpellCasterManager() {
    const [spellCasters, setSpellCasters] = useState<SpellCaster[]>([]);
    const [modalOpened, { open, close }] = useDisclosure(false);
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<SpellCaster>({
        initialValues: defaultSpellCaster(),
    });

    useEffect(() => {
        setSpellCasters(getAllSpellCasters());
    }, []);

    const handleSave = (values: SpellCaster) => {
        if (isEditing) {
            updateSpellCaster(values);
            notifications.show({
                title: "Updated",
                message: `${values.name} was updated.`,
                color: "blue",
            });
        } else {
            addSpellCaster(values);
            notifications.show({
                title: "Added",
                message: `${values.name} was added.`,
                color: "green",
            });
        }
        setSpellCasters(getAllSpellCasters());
        close();
    };

    const handleEdit = (caster: SpellCaster) => {
        form.setValues(caster);
        setIsEditing(true);
        open();
    };

    const handleDelete = (id: string) => {
        deleteSpellCaster(id);
        setSpellCasters(getAllSpellCasters());
        notifications.show({
            title: "Deleted",
            message: `Spell caster deleted.`,
            color: "red",
        });
    };

    return (
        <>
            <Group justify="space-between" mb="md">
                <h2>Spell Casters</h2>
                <Button
                    onClick={() => {
                        form.setValues(defaultSpellCaster());
                        setIsEditing(false);
                        open();
                    }}
                >
                    Add Spell Caster
                </Button>
            </Group>

            <Paper shadow="xs" p="md" withBorder>
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Divinity</Table.Th>
                            <Table.Th>Total Magic</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {spellCasters.map((sc) => (
                            <Table.Tr key={sc.id}>
                                <Table.Td>{sc.name}</Table.Td>
                                <Table.Td>{sc.divinity || '—'}</Table.Td>
                                <Table.Td>
                                    {[
                                        sc.abyssal_magic_level,
                                        sc.deep_magic_level,
                                        sc.divine_level,
                                        sc.fairy_magic_level,
                                        sc.magitech_level,
                                        sc.nature_level,
                                        sc.spiritualism_level,
                                        sc.summoning_arts_level,
                                        sc.truespeech_level,
                                    ].reduce((a, b) => a + b, 0)}
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        <Button size="xs" onClick={() => handleEdit(sc)}>
                                            Edit
                                        </Button>
                                        <Button size="xs" color="red" onClick={() => handleDelete(sc.id)}>
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
                title={isEditing ? "Edit Spell Caster" : "Add Spell Caster"}
                size="lg"
            >
                <form onSubmit={form.onSubmit(handleSave)}>
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput label="Name" {...form.getInputProps("name")} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput label="Divinity" {...form.getInputProps("divinity")} />
                        </Grid.Col>

                        {[
                            "abyssal_magic_level",
                            "deep_magic_level",
                            "divine_level",
                            "fairy_magic_level",
                            "magitech_level",
                            "nature_level",
                            "spiritualism_level",
                            "summoning_arts_level",
                            "truespeech_level",
                        ].map((field) => (
                            <Grid.Col span={6} key={field}>
                                <NumberInput
                                    label={field.replace(/_/g, " ")}
                                    min={0}
                                    max={15}
                                    {...form.getInputProps(field)}
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
