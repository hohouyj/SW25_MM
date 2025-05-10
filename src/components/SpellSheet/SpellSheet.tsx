import { Accordion, Container, Paper, Text } from "@mantine/core";
import { SpellCaster, Spell, SpellBins } from "../../types";
import { defaultSpellCaster, getSpellCaster } from "../../utils/spellCasterStorage";
import { useParams } from "react-router-dom";
import SpellCard from "../SpellCard/SpellCard";
import spellData from "../../data/spells.json";



export default function SpellSheet() {

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

    const spellBins = binSpellsByTradition(spells)

    return (
        <Accordion multiple variant="separated">
            {Object.entries(spellBins)
                .filter(([_, spells]) => spells.length > 0) // 👈 filter out empty bins
                .map(([tradition, spells]) => (
                    <Accordion.Item key={tradition} value={tradition}>
                        <Accordion.Control>{tradition} ({spells.length})</Accordion.Control>
                        <Accordion.Panel>
                            {spells.map((spell) => (
                                <Paper key={spell.spell_id} withBorder p="sm" mb="sm" radius="md">
                                    <Text fw={500}>{spell.name} (Level {spell.level})</Text>
                                    <Text size="sm" c="dimmed">{spell.summary || spell.description}</Text>
                                </Paper>
                            ))}
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
        </Accordion>

    );
}