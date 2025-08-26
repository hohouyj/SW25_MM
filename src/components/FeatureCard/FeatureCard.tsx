import {
    Badge,
    Card,
    Divider,
    Group,
    Stack,
    Text,
    Title,
    Box,
} from '@mantine/core';
import { FeatureName } from './FeatureCardConfigs';
import { FeatureCardConfig } from '../../types';
import "./feature_card_styles.css"

interface FeatureCardProps<T> {
    data: T & { feature_name: FeatureName };
    config: FeatureCardConfig<T>;
}

export default function FeatureCard<T>({ data, config }: FeatureCardProps<T>) {
    const infoGap = 0;
    const labelWidth = 180;

    const headerField = config.fields.find(f => f.isHeader);
    const badgeFields = config.fields.filter(f => f.isBadge);
    const descriptionFields = config.fields.filter(f => f.isDescription);
    const customFields = config.fields.filter(f => f.isCustom);
    const otherFields = config.fields.filter(
        f => !f.isHeader && !f.isBadge && !f.isDescription && !f.isCustom
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

                        // ✅ Default key-value rendering
                        return (
                            <Group key={String(f.key)} gap={infoGap}>
                                <Text fw={500} w={labelWidth}>{f.label || String(f.key)}</Text>
                                <Text>{f.render ? f.render(val) : String(val)}</Text>
                            </Group>
                        );
                    })}
                </Stack>
                {customFields.map(f => {
                    const val = data[f.key];

                    if (f.hideIfEmpty && (val === null || val === undefined || val === '')) {
                        return null;
                    }

                    return f.render ? f.render(val, f.key, infoGap) : null;
                })}

                {/* Descriptions */}
                {descriptionFields.map(f => {
                    const val = data[f.key];
                    if (!val) return null;
                    return (
                        <Box key={String(f.key)} mt="sm">
                            <Divider />
                            <Text size="sm" fw={500} mt="xs" mb="xs">
                                {f.label || String(f.key)}:
                            </Text>
                            <Box
                                dangerouslySetInnerHTML={{ __html: val as string }}
                            />
                        </Box>
                    );
                })}
            </Stack>
        </Card>
    );
}
