import { Box, Flex, Paper, Select, SimpleGrid, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import spellData from "../../data/spells.json";
import { Spell, SpellBins, SpellCaster } from "../../types";
import { defaultSpellCaster, getSpellCaster } from "../../utils/spellCasterStorage";
import SpellCard from "../SpellCard/SpellCard";



export default function SpellSheet() {

    const [expandedSpellId, setExpandedSpellId] = useState<string | number | null>(null);

    const [search, setSearch] = useState('');
    const [tradition, setTradition] = useState<string | null>(null);
    const [cost, setCost] = useState<string | null>(null);
    const [magisphere, setMagisphere] = useState<string | null>(null);
    const [fairyMagicType, setFairyMagicType] = useState<string | null>(null);
    const [target, setTarget] = useState<string | null>(null);
    const [resistance, setResistance] = useState<string | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [castingTime, setCastingTime] = useState<string | null>(null);
    const [range, setRange] = useState<string | null>(null);
    const [duration, setDuration] = useState<string | null>(null);



    const { id } = useParams();

    const spellCaster = id ? getSpellCaster(id) : defaultSpellCaster()

    const getAvailableSpells = (spellCaster: SpellCaster): Spell[] => {
        // Map caster traditions to their levels
        const casterTraditionLevels: Record<string, number> = {
            "abyssal magic": spellCaster.abyssal_magic_level,
            "deep magic": spellCaster.deep_magic_level,
            divine: spellCaster.divine_level,
            "fairy magic": spellCaster.fairy_magic_level,
            magitech: spellCaster.magitech_level,
            nature: spellCaster.nature_level,
            spiritualism: spellCaster.spiritualism_level,
            "summoning arts": spellCaster.summoning_arts_level,
            truespeech: spellCaster.truespeech_level,
        };

        return spellData.spells.filter((spell) => {
            const spellTradition = spell.tradition.toLowerCase();
            const spellLevel = parseInt(spell.level, 10); // assuming level is a string like "1", "2", etc.

            const casterLevel = casterTraditionLevels[spellTradition];
            if (casterLevel === undefined || spellLevel > casterLevel) return false;

            // Filter divine spells by divinity match (if specified)
            if (
                spellTradition === "divine" &&
                spell.divinity &&
                !spellCaster.divinity?.toLowerCase().includes(spell.divinity.toLowerCase())
            ) {
                return false;
            }

            // Filter fairy magic spells by fairy_magic_type match (if specified)
            if (
                spellTradition === "fairy magic" &&
                spell.fairy_magic_type &&
                !spellCaster.fairy_magic_types.map((t) => t.toLowerCase()).includes(spell.fairy_magic_type.toLowerCase())
            ) {
                return false;
            }

            return true;
        }).sort((item1, item2) => {
            return parseInt(item1.level) - parseInt(item2.level);
        });
    };


    const spells = getAvailableSpells(spellCaster)

    function extractFirstNumber(str: string | null | undefined): number {
        if (!str) return Infinity;
        const match = str.match(/\d+/); // Match one or more digits
        return match ? parseInt(match[0], 10) : Infinity;
    }
    const costOptions = [...new Set(spells.map((s) => s.cost))]
        .sort((a, b) => extractFirstNumber(a) - extractFirstNumber(b));
    const traditionOptions = [...new Set(spells.map((s) => s.tradition))];
    const magisphereOptions = Array.from(
        new Set(
            spells
                .map((s) => s.magisphere)
                .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
        )
    ).sort();
    const fairyMagicTypeOptions = Array.from(
        new Set(
            spells
                .map((s) => s.fairy_magic_type)
                .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
        )
    ).sort();
    const targetOptions = [...new Set(spells.map((s) => s.target))];
    const resistanceOptions = Array.from(
        new Set(
            spells
                .map((s) => s.resistance)
                .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
        )
    ).sort();
    const typeOptions = Array.from(
        new Set(
            spells
                .map((s) => s.type)
                .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
        )
    ).sort();
    const castingTimeOptions = Array.from(
        new Set(
            spells
                .map((s) => s.casting_time)
                .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
        )
    ).sort();
    const rangeOptions = Array.from(
        new Set(
            spells
                .map((s) => s.rangearea)
                .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
        )
    ).sort();
    const durationOptions = Array.from(
        new Set(
            spells
                .map((s) => s.duration)
                .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
        )
    ).sort();

    const filteredSpells = getAvailableSpells(spellCaster).filter((spell) => {
        const searchLower = search.toLowerCase();
        const costLower = cost?.toLowerCase();
        return (
            (!tradition || spell.tradition === tradition) &&
            (!magisphere || spell.magisphere?.includes(magisphere)) &&
            (!fairyMagicType || spell.fairy_magic_type == fairyMagicType) &&
            (!cost || spell.cost.toLowerCase() === costLower) &&
            (!target || spell.target === target) &&
            (!resistance || spell.resistance === resistance) &&
            (!type || spell.type === type) &&
            (!castingTime || spell.casting_time === castingTime) &&
            (!range || spell.rangearea === range) &&
            (!duration || spell.duration === duration) &&

            (search === '' ||
                [
                    spell.name,
                    spell.summary,
                    spell.description,
                    spell.power_table,
                ]
                    .filter(Boolean)
                    .some((value): value is string => typeof value === 'string' && value.toLowerCase().includes(searchLower)))
        );
    });

    const binSpellsByTradition = (filteredSpells: Spell[]): SpellBins => {
        const bins: SpellBins = {};
        const traditions = ['Divine', 'Nature', 'Deep Magic', 'Spiritualism', 'Abyssal Magic', 'Truespeech', 'Magitech', 'Fairy Magic', 'Summoning Arts']

        traditions.forEach((tradition) => {
            bins[tradition] = filteredSpells.filter(
                (spell) => spell.tradition.toLowerCase() === tradition.toLowerCase()
            );
        });

        return bins;
    };

    const spellBins = binSpellsByTradition(filteredSpells)


    return (
        <>
            <Flex wrap="wrap" gap="md" mb="md">
                <Box style={{ flex: '1 1 100%' }}>
                    <TextInput
                        label="Search"
                        placeholder="Any keyword"
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                    />
                </Box>

                <Box style={{ flex: '1 1 30%' }}>
                    <Select
                        label="Tradition"
                        placeholder="Any tradition"
                        data={traditionOptions}
                        value={tradition}
                        onChange={setTradition}
                        clearable
                    />
                </Box>

                <Box style={{ flex: '1 1 20%' }}>
                    <Select
                        label="Cost"
                        placeholder="Any cost"
                        data={costOptions}
                        value={cost}
                        onChange={setCost}
                        clearable
                    />
                </Box>

                <Box style={{ flex: '1 1 20%' }}>
                    <Select
                        label="Target"
                        placeholder="Any target"
                        data={targetOptions}
                        value={target}
                        onChange={setTarget}
                        clearable
                    />
                </Box>

                <Box style={{ flex: '1 1 20%' }}>
                    <Select
                        label="Resistance"
                        placeholder="Any resistance"
                        data={resistanceOptions}
                        value={resistance}
                        onChange={setResistance}
                        clearable
                    />
                </Box>

                <Box style={{ flex: '1 1 20%' }}>
                    <Select
                        label="Damage Type"
                        placeholder="Any damage type"
                        data={typeOptions}
                        value={type}
                        onChange={setType}
                        clearable
                    />
                </Box>

                <Box style={{ flex: '1 1 20%' }}>
                    <Select
                        label="Casting Time"
                        placeholder="Any casting time"
                        data={castingTimeOptions}
                        value={castingTime}
                        onChange={setCastingTime}
                        clearable
                    />
                </Box>
                
                <Box style={{ flex: '1 1 20%' }}>
                    <Select
                        label="Range"
                        placeholder="Any range"
                        data={rangeOptions}
                        value={range}
                        onChange={setRange}
                        clearable
                    />
                </Box>

                <Box style={{ flex: '1 1 20%' }}>
                    <Select
                        label="Duration"
                        placeholder="Any duration"
                        data={durationOptions}
                        value={duration}
                        onChange={setDuration}
                        clearable
                    />
                </Box>

                {magisphereOptions.length > 0 && (
                    <Box style={{ flex: '1 1 20%' }}>
                        <Select
                            label="Magisphere"
                            placeholder="Any magisphere"
                            data={magisphereOptions}
                            value={magisphere}
                            onChange={setMagisphere}
                            clearable
                        />
                    </Box>
                )}

                {fairyMagicTypeOptions.length > 0 && (
                    <Box style={{ flex: '1 1 20%' }}>
                        <Select
                            label="Fairy Magic Type"
                            placeholder="Any fairy magic type"
                            data={fairyMagicTypeOptions}
                            value={fairyMagicType}
                            onChange={setFairyMagicType}
                            clearable
                        />
                    </Box>
                )}
            </Flex>

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