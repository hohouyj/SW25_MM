import { Box, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSpellFilter } from "../../hooks/useSpellFilter";
import { defaultSpellCaster, getSpellCaster } from "../../utils/spellCasterStorage";
import { binSpellsByTradition, getAvailableSpells } from "../../utils/spellFilter";
import SpellCard from "../SpellCard/SpellCard";
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
            <SimpleGrid cols={3} spacing="lg">
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
                                    <div
                                        key={spell.spell_id}
                                        onClick={() =>
                                            setExpandedSpellId(isExpanded ? null : spell.spell_id)
                                        }
                                    >
                                        {isExpanded ? (
                                            <SpellCard spell={spell} />
                                        ) : (
                                            <Paper withBorder p="sm" mb="sm" radius="md" style={{ cursor: "pointer" }}>
                                                <Text fw={500}>
                                                    {spell.name} (Level {spell.level}) {spell.cost}
                                                </Text>
                                                <Text size="sm" c="dimmed">
                                                    {spell.summary || spell.description}
                                                </Text>
                                            </Paper>
                                        )}
                                    </div>
                                );
                            })}
                        </Box>
                    ))}
            </SimpleGrid>
        </>
    );
}