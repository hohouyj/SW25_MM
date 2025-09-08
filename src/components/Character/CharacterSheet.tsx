import { Tabs, Title } from "@mantine/core";
import { IconSwords, IconWand } from "@tabler/icons-react";
import SpellSheet from "../SpellSheet/SpellSheet";
import CharacterFeatureSheet from "../CharacterFeatureSheet/CharacterFeatureSheet";
import { getCharacter } from "../../utils/characterStorage";
import { useParams } from "react-router-dom";
import { Character } from "../../types";
import { useState } from "react";

export function CharacterSheet() {
    const { id } = useParams<{ id: string }>();
    const character: Character = getCharacter(id);

    const spellLevels =
        character.abyssal_magic_level +
        character.deep_magic_level +
        character.divine_level +
        character.fairy_magic_level +
        character.magitech_level +
        character.nature_level +
        character.spiritualism_level +
        character.summoning_arts_level +
        character.truespeech_level;

    const defaultTab = spellLevels === 0 ? "features" : "spells";

    const [activeTab, setActiveTab] = useState<string | null>(defaultTab);

    return (
        <>
            <Title>{character.name}</Title>
            <Tabs value={activeTab} onChange={setActiveTab} >
                <Tabs.List mb="sm">
                    {spellLevels > 0 && (
                        <Tabs.Tab value="spells" leftSection={<IconWand />}>
                            Spells
                        </Tabs.Tab>
                    )}
                    <Tabs.Tab value="features" leftSection={<IconSwords />}>
                        Features
                    </Tabs.Tab>
                </Tabs.List>

                {spellLevels > 0 && (
                    <Tabs.Panel value="spells">
                        <SpellSheet />
                    </Tabs.Panel>
                )}

                <Tabs.Panel value="features">
                    <CharacterFeatureSheet />
                </Tabs.Panel>
            </Tabs>
        </>
    );
}