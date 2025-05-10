import { useState } from "react";
import { Container, Flex, NumberInput } from "@mantine/core";
import { SpellCaster } from "../../types";

export default function SpellSheet() {
    const [spellCaster, setSpellCaster] = useState<SpellCaster>({
        id: '',
        name: '',
        abyssal_magic_level: 0,
        deep_magic_level: 0,
        divine_level: 0,
        divinity: null,
        fairy_magic_level: 0,
        magitech_level: 0,
        nature_level: 0,
        spiritualism_level: 0,
        summoning_arts_level: 0,
        truespeech_level: 0
    });

    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSpellCaster(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberInputChange = (name: keyof SpellCaster) => (value: string | number) => {
        const numValue = typeof value === 'string' ? Number(value) : value;
        if(name == 'spiritualism_level' || name == 'truespeech_level'){
            //todo deep magic handling (lower of either spiritualism or truespeech)
        
            setSpellCaster(prev => ({
                ...prev,
                deep_magic_level: isNaN(numValue) ? prev[name] : numValue
            }));
        }
        setSpellCaster(prev => ({
            ...prev,
            [name]: isNaN(numValue) ? prev[name] : numValue
        }));
    };

    return (
        <Container display={Flex}>
            <pre>{JSON.stringify(spellCaster)}</pre>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={spellCaster.name}
                        onChange={handleTextInputChange}
                    />
                </label>
            </div>

            <NumberInput
                label="Abyss Gazer Level"
                value={spellCaster.abyssal_magic_level}
                onChange={handleNumberInputChange("abyssal_magic_level")}
            />
            <NumberInput
                label="Artificer Level"
                value={spellCaster.magitech_level}
                onChange={handleNumberInputChange("magitech_level")}
            />
            <NumberInput
                label="Conjurer Level"
                value={spellCaster.spiritualism_level}
                onChange={handleNumberInputChange("spiritualism_level")}
            />
            <NumberInput
                label="Druid Level"
                value={spellCaster.nature_level}
                onChange={handleNumberInputChange("nature_level")}
            /><NumberInput
                label="Fairy Tamer Level"
                value={spellCaster.fairy_magic_level}
                onChange={handleNumberInputChange("fairy_magic_level")}
            /><NumberInput
                label="Priest Level"
                value={spellCaster.divine_level}
                onChange={handleNumberInputChange("divine_level")}
            /><NumberInput
                label="Sorcerer Level"
                value={spellCaster.truespeech_level}
                onChange={handleNumberInputChange("truespeech_level")}
            /><NumberInput
                label="Warlock Level"
                value={spellCaster.summoning_arts_level}
                onChange={handleNumberInputChange("summoning_arts_level")}
            />
        </Container>
    );
}