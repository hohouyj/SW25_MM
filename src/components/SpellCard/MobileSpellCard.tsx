import {
    Badge,
    Card,
    Divider,
    Group,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import { Spell } from '../../types';

interface MobileSpellCardProps {
    spell: Spell;
}

export default function MobileSpellCard({ spell }: MobileSpellCardProps) {

    const infoGap = 0
    const labelWidth = 180
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Stack gap="xs">
                <Group justify="left" wrap="wrap">
                    <Title order={4}>
                        {spell.name} {spell.level && `(Level ${spell.level})`}
                    </Title>
                    <Badge color="blue" variant="light">
                        {spell.tradition}
                    </Badge>
                </Group>

                <Divider />

                <Stack gap={infoGap}>
                    {spell.cost && (
                        <Group gap={infoGap}>
                            <Text fw={500} w={labelWidth}>Cost</Text>
                            <Text>{spell.cost}</Text>
                        </Group>
                    )}
                    {spell.target && (
                        <Group gap={infoGap}>
                            <Text fw={500} w={labelWidth}>Target</Text>
                            <Text>{spell.target}</Text>
                        </Group>
                    )}
                    {spell.duration && (
                        <Group gap={infoGap}>
                            <Text fw={500} w={labelWidth}>Duration</Text>
                            <Text>{spell.duration}</Text>
                        </Group>
                    )}
                    {spell.rangearea && (
                        <Group gap={infoGap}>
                            <Text fw={500} w={labelWidth}>Range/Area</Text>
                            <Text>{spell.rangearea}</Text>
                        </Group>
                    )}
                    {spell.resistance && (
                        <Group gap={infoGap}>
                            <Text fw={500} w={labelWidth}>Resistance</Text>
                            <Text>{spell.resistance}</Text>
                        </Group>
                    )}
                    {spell.type && (
                        <Group gap={infoGap}>
                            <Text fw={500} w={labelWidth}>Type</Text>
                            <Text>{spell.type}</Text>
                        </Group>
                    )}
                    {spell.casting_time && (
                        <Group gap={infoGap}>
                            <Text fw={500} w={labelWidth}>Casting Time</Text>
                            <Text>{spell.casting_time}</Text>
                        </Group>
                    )}
                    {spell.preparation_time && (
                        <Group gap={infoGap}>
                            <Text fw={500} w={labelWidth}>Preparation Time</Text>
                            <Text>{spell.preparation_time}</Text>
                        </Group>
                    )}
                    {spell.divinity && (
                        <Group gap={infoGap}>
                            <Text fw={500} w={labelWidth}>Divinity</Text>
                            <Text>{spell.divinity}</Text>
                        </Group>
                    )}
                    {spell.fairy_magic_type && (
                        <Group gap={infoGap}>
                            <Text fw={500} w={labelWidth}>Fairy Magic Type</Text>
                            <Text>{spell.fairy_magic_type}</Text>
                        </Group>
                    )}
                    {spell.magisphere && (
                        <Group gap={infoGap}>
                            <Text fw={500} w={labelWidth}>Magisphere</Text>
                            <Text>{spell.magisphere}</Text>
                        </Group>
                    )}
                </Stack>

                {spell.power_table && (
                    <>
                        <Divider mt="sm" />
                        <Text size="sm" fw={500}>Power Table:</Text>
                        <div
                            style={{ fontSize: '0.875rem', color: '#5c5f66' }}
                            dangerouslySetInnerHTML={{ __html: spell.power_table }}
                        />
                    </>
                )}

                {spell.description && (
                    <>
                        <Divider mt="sm" />
                        <Text size="sm" fw={500}>Description:</Text>
                        <div
                            style={{ fontSize: '0.875rem', color: '#5c5f66' }}
                            dangerouslySetInnerHTML={{ __html: spell.description }}
                        />
                    </>
                )}
            </Stack>
        </Card>
    );
}
