import {
    Badge,
    Card,
    Divider,
    Group,
    Stack,
    Text,
    Title,
} from '@mantine/core';

interface FeatureCardProps<T> {
    data: T;
    config: {
        fields: {
            isCustom?: boolean;
            key: keyof T;
            label?: string;
            isHeader?: boolean;
            isBadge?: boolean;
            isDescription?: boolean;
            hideIfEmpty?: boolean;
        }[];
    };
}

export default function FeatureCard<T>({ data, config }: FeatureCardProps<T>) {
    const infoGap = 0;
    const labelWidth = 180;

    const headerField = config.fields.find(f => f.isHeader);
    const badgeFields = config.fields.filter(f => f.isBadge);
    const descriptionFields = config.fields.filter(f => f.isDescription);
    const otherFields = config.fields.filter(
        f => !f.isHeader && !f.isBadge && !f.isDescription
    );

    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Stack gap="xs">
                {/* Header */}
                <Group justify="left" wrap="wrap">
                    {headerField && (
                        <Title order={4}>
                            {data[headerField.key] as string}
                        </Title>
                    )}
                    {badgeFields.map(f => {
                        const val = data[f.key];
                        return val ? (
                            <Badge key={String(f.key)} color="blue" variant="light">
                                {val as string}
                            </Badge>
                        ) : null;
                    })}
                </Group>

                <Divider />

                {/* Key-Value Fields */}
                <Stack gap={infoGap}>
                    {otherFields.map(f => {
                        const val = data[f.key];

                        if (f.hideIfEmpty && (val === null || val === undefined || val === '')) return null;

                        // ✅ Handle custom render for card_grades
                        if (f.isCustom && f.key === 'card_grades') {
                            const grades = val as Record<string, string>;
                            return (
                                <div key="card_grades">
                                    <Divider mt="sm" />
                                    <Text size="sm" fw={500}>Card Grades:</Text>
                                    <ul style={{ fontSize: '0.875rem', color: '#5c5f66', marginTop: '4px', paddingLeft: '16px' }}>
                                        {Object.entries(grades).map(([grade, effect]) => (
                                            <li key={grade}><strong>{grade}</strong>: {effect}</li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        }

                        // ✅ Default key-value rendering
                        return (
                            <Group key={String(f.key)} gap={infoGap}>
                                <Text fw={500} w={labelWidth}>{f.label || String(f.key)}</Text>
                                <Text>{String(val)}</Text>
                            </Group>
                        );
                    })}
                </Stack>




                {/* Descriptions */}
                {descriptionFields.map(f => {
                    const val = data[f.key];
                    if (!val) return null;
                    return (
                        <div key={String(f.key)}>
                            <Divider mt="sm" />
                            <Text size="sm" fw={500}>{f.label || String(f.key)}:</Text>
                            <div
                                style={{ fontSize: '0.875rem', color: '#5c5f66' }}
                                dangerouslySetInnerHTML={{ __html: val as string }}
                            />
                        </div>
                    );
                })}
            </Stack>
        </Card>
    );
}
