import { Box, Button, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSpellFilter } from "../../hooks/useSpellFilter";
import { defaultSpellCaster, getSpellCaster } from "../../utils/spellCasterStorage";
import { binSpellsByTradition, getAvailableSpells } from "../../utils/spellFilter";
import MobileSpellCard from "../SpellCard/MobileSpellCard";
import SpellFilter from "./SpellFilter";

export default function SpellSheet() {
    const [expandedSpellId, setExpandedSpellId] = useState<string | number | null>(null);
    const { id } = useParams();
    const spellCaster = useMemo(
        () => (id ? getSpellCaster(id) : defaultSpellCaster()),
        [id]
    );
    const availableSpells = useMemo(
        () => getAvailableSpells(spellCaster),
        [spellCaster]
    );

    const { filteredSpells, filters, updateFilters, options } = useSpellFilter(availableSpells);
    const spellBins = binSpellsByTradition(filteredSpells)

    return (
        <>
            <SpellFilter options={options} filters={filters} updateFilters={updateFilters} />

            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing="lg"
                verticalSpacing="md"
            >
                {Object.entries(spellBins)
                    .filter(([_, spells]) => spells.length > 0)
                    .map(([tradition, spells]) => (
                        <Box key={tradition}>
                            <Title order={4} mb="sm">
                                {tradition} ({spells.length})
                            </Title>

                            {spells.map((spell) => {
                                const isExpanded = expandedSpellId === spell.spell_id;

                                return (
                                    <Box key={spell.spell_id} mb="sm" pos="relative">
                                        <Button
                                            size="xs"
                                            variant="subtle"
                                            style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                                            onClick={() =>
                                                setExpandedSpellId(isExpanded ? null : spell.spell_id)
                                            }
                                        >
                                            {isExpanded ? 'Close' : 'Open'}
                                        </Button>

                                        {isExpanded ? (
                                            <MobileSpellCard spell={spell} />
                                        ) : (
                                            <Paper withBorder p="sm" radius="md" style={{ cursor: 'pointer' }}>
                                                <Text fw={500}>
                                                    {spell.name} (Level {spell.level}) {spell.cost}
                                                </Text>
                                                <Text size="sm" c="dimmed">
                                                    {spell.summary || spell.description}
                                                </Text>
                                            </Paper>
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    ))}
            </SimpleGrid>
        </>
    );
}