import {
    Button,
    Table,
    TextInput,
    NumberInput,
    Modal,
    Group,
    Paper,
    Grid,
    Select,
    MultiSelect,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import {
    getAllSpellCasters,
    addSpellCaster,
    updateSpellCaster,
    deleteSpellCaster,
    defaultSpellCaster,
} from "../../utils/spellCasterStorage";
import { SpellCaster } from "../../types";
import { useNavigate } from "react-router-dom";

export default function SpellCasterManager() {
    const [spellCasters, setSpellCasters] = useState<SpellCaster[]>([]);
    const [modalOpened, { open, close }] = useDisclosure(false);
    const [isEditing, setIsEditing] = useState(false);
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

    const openSpellSheet = (id: string) => {
        navigate("/spellCaster/" + id)
    }

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
                            <Table.Tr key={sc.id} >
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
                                        <Button size="xs" color="green" onClick={() => openSpellSheet(sc.id)}>
                                            Spell Sheet
                                        </Button>
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
                            <Select
                                label="Divinity"
                                data={DIVINITY_OPTIONS}
                                clearable
                                {...form.getInputProps("divinity")}
                            />
                        </Grid.Col>

                        <Grid.Col span={12}>
                            <MultiSelect
                                label="Fairy Magic Elements"
                                data={FAIRY_MAGIC_OPTIONS}
                                searchable
                                clearable
                                {...form.getInputProps("fairy_magic_types")}
                            />
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
