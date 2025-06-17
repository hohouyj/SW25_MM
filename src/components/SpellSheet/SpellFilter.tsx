import { Box, Flex, Select, TextInput } from "@mantine/core";
import { SpellFilters } from "../../hooks/useSpellFilter";

interface SpellFilterProps {
    filters: SpellFilters;
    updateFilters: Function;
    options: Record<string, string[]>;
}

export default function SpellFilter({ filters, updateFilters, options  }: SpellFilterProps) {
    return <>
        <Flex wrap="wrap" gap="md" mb="md">
            <Box style={{ flex: '1 1 100%' }}>
                <TextInput
                    label="Search"
                    placeholder="Any keyword"
                    value={options.search}
                    onChange={(e) => updateFilters("search")(e.currentTarget.value)}
                />
            </Box>

            <Box style={{ flex: '1 1 30%' }}>
                <Select
                    label="Tradition"
                    placeholder="Any tradition"
                    data={options.tradition}
                    value={filters.tradition}
                    disabled={options.tradition.length === 0}
                    onChange={updateFilters("tradition")}
                    clearable
                />
            </Box>

            <Box style={{ flex: '1 1 20%' }}>
                <Select
                    label="Cost"
                    placeholder="Any cost"
                    data={options.cost}
                    value={filters.cost}
                    disabled={options.cost.length === 0}
                    onChange={updateFilters("cost")}
                    clearable
                />
            </Box>

            <Box style={{ flex: '1 1 20%' }}>
                <Select
                    label="Target"
                    placeholder="Any target"
                    data={options.target}
                    value={filters.target}
                    disabled={options.target.length === 0}
                    onChange={updateFilters("target")}
                    clearable
                />
            </Box>

            <Box style={{ flex: '1 1 20%' }}>
                <Select
                    label="Resistance"
                    placeholder="Any resistance"
                    data={options.resistance}
                    value={filters.resistance}
                    disabled={options.resistance.length === 0}
                    onChange={updateFilters("resistance")}
                    clearable
                />
            </Box>

            <Box style={{ flex: '1 1 20%' }}>
                <Select
                    label="Damage Type"
                    placeholder="Any damage type"
                    data={options.type}
                    value={filters.type}
                    disabled={options.type.length === 0}
                    onChange={updateFilters("type")}
                    clearable
                />
            </Box>

            <Box style={{ flex: '1 1 20%' }}>
                <Select
                    label="Casting Time"
                    placeholder="Any casting time"
                    data={options.casting_time}
                    value={filters.casting_time}
                    disabled={options.casting_time.length === 0}
                    onChange={updateFilters("casting_time")}
                    clearable
                />
            </Box>

            <Box style={{ flex: '1 1 20%' }}>
                <Select
                    label="Range"
                    placeholder="Any range"
                    data={options.rangearea}
                    value={filters.rangearea}
                    disabled={options.rangearea.length === 0}
                    onChange={updateFilters("rangearea")}
                    clearable
                />
            </Box>

            <Box style={{ flex: '1 1 20%' }}>
                <Select
                    label="Duration"
                    placeholder="Any duration"
                    data={options.duration}
                    value={filters.duration}
                    disabled={options.duration.length === 0}
                    onChange={updateFilters("duration")}
                    clearable
                />
            </Box>

            {options.magisphere.length > 0 && (
                <Box style={{ flex: '1 1 20%' }}>
                    <Select
                        label="Magisphere"
                        placeholder="Any magisphere"
                        data={options.magisphere}
                        value={filters.magisphere}
                        onChange={updateFilters("magisphere")}
                        clearable
                    />
                </Box>
            )}

            {options.fairy_magic_type.length > 0 && (
                <Box style={{ flex: '1 1 20%' }}>
                    <Select
                        label="Fairy Magic Type"
                        placeholder="Any fairy magic type"
                        data={options.fairy_magic_type}
                        value={filters.fairy_magic_type}
                        onChange={updateFilters("fairy_magic_type")}
                        clearable
                    />
                </Box>
            )}
        </Flex>
    </>

}