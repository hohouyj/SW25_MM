const twoDSixProbabilities = {
    2: 1 / 36,
    3: 2 / 36,
    4: 3 / 36,
    5: 4 / 36,
    6: 5 / 36,
    7: 6 / 36,
    8: 5 / 36,
    9: 4 / 36,
    10: 3 / 36,
    11: 2 / 36,
    12: 1 / 36,
} as const;

const twoDSixAtLeastProbabilities = Object.entries(
    twoDSixProbabilities
).reduceRight<Record<number, number>>((acc, [total, prob], _, arr) => {
    const t = Number(total);
    const nextHigher = arr.find(([k]) => Number(k) === t + 1);
    acc[t] = (nextHigher ? acc[t + 1] : 0) + prob;
    return acc;
}, {});

const p_tbl_raw: number[][] = [
    [0, 0, 0, 1, 2, 2, 3, 3, 4, 4],
    [0, 0, 0, 1, 2, 3, 3, 3, 4, 4],
    [0, 0, 0, 1, 2, 3, 4, 4, 4, 4],
    [0, 0, 1, 1, 2, 3, 4, 4, 4, 5],
    [0, 0, 1, 2, 2, 3, 4, 4, 5, 5],
    [0, 1, 1, 2, 2, 3, 4, 5, 5, 5],
    [0, 1, 1, 2, 3, 3, 4, 5, 5, 5],
    [0, 1, 1, 2, 3, 4, 4, 5, 5, 6],
    [0, 1, 2, 2, 3, 4, 4, 5, 6, 6],
    [0, 1, 2, 3, 3, 4, 4, 5, 6, 7],
    [1, 1, 2, 3, 3, 4, 5, 5, 6, 7],
    [1, 2, 2, 3, 3, 4, 5, 6, 6, 7],
    [1, 2, 2, 3, 4, 4, 5, 6, 6, 7],
    [1, 2, 3, 3, 4, 4, 5, 6, 7, 7],
    [1, 2, 3, 4, 4, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 4, 5, 5, 6, 7, 8],
    [1, 2, 3, 4, 4, 5, 6, 7, 7, 8],
    [1, 2, 3, 4, 5, 5, 6, 7, 7, 8],
    [1, 2, 3, 4, 5, 6, 6, 7, 7, 8],
    [1, 2, 3, 4, 5, 6, 7, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 6, 6, 7, 8, 9, 10],
    [1, 2, 3, 5, 6, 6, 7, 8, 9, 10],
    [2, 2, 3, 5, 6, 7, 7, 8, 9, 10],
    [2, 3, 4, 5, 6, 7, 7, 8, 9, 10],
    [2, 3, 4, 5, 6, 7, 8, 8, 9, 10],
    [2, 3, 4, 5, 6, 8, 8, 9, 9, 10],
    [2, 3, 4, 6, 6, 8, 8, 9, 9, 10],
    [2, 3, 4, 6, 6, 8, 9, 9, 10, 10],
    [2, 3, 4, 6, 7, 8, 9, 9, 10, 10],
    [2, 4, 4, 6, 7, 8, 9, 10, 10, 10],
    [2, 4, 5, 6, 7, 8, 9, 10, 10, 11],
    [3, 4, 5, 6, 7, 8, 10, 10, 10, 11],
    [3, 4, 5, 6, 8, 8, 10, 10, 10, 11],
    [3, 4, 5, 6, 8, 9, 10, 10, 11, 11],
    [3, 4, 5, 7, 8, 9, 10, 10, 11, 12],
    [3, 5, 5, 7, 8, 9, 10, 11, 11, 12],
    [3, 5, 6, 7, 8, 9, 10, 11, 12, 12],
    [3, 5, 6, 7, 8, 10, 10, 11, 12, 13],
    [4, 5, 6, 7, 8, 10, 11, 11, 12, 13],
    [4, 5, 6, 7, 9, 10, 11, 11, 12, 13],
    [4, 6, 6, 7, 9, 10, 11, 12, 12, 13],
    [4, 6, 7, 7, 9, 10, 11, 12, 13, 13],
    [4, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    [4, 6, 7, 8, 10, 10, 11, 12, 13, 14],
    [4, 6, 7, 9, 10, 10, 11, 12, 13, 14],
    [4, 6, 7, 9, 10, 10, 12, 13, 13, 14],
    [4, 6, 7, 9, 10, 11, 12, 13, 13, 15],
    [4, 6, 7, 9, 10, 12, 12, 13, 13, 15],
    [4, 6, 7, 10, 10, 12, 12, 13, 14, 15],
    [4, 6, 8, 10, 10, 12, 12, 13, 15, 15],
    [5, 7, 8, 10, 10, 12, 12, 13, 15, 15],
    [5, 7, 8, 10, 11, 12, 12, 13, 15, 15],
    [5, 7, 9, 10, 11, 12, 12, 14, 15, 15],
    [5, 7, 9, 10, 11, 12, 13, 14, 15, 16],
    [5, 7, 10, 10, 11, 12, 13, 14, 16, 16],
    [5, 8, 10, 10, 11, 12, 13, 15, 16, 16],
    [5, 8, 10, 11, 11, 12, 13, 15, 16, 17],
    [5, 8, 10, 11, 12, 12, 13, 15, 16, 17],
    [5, 9, 10, 11, 12, 12, 14, 15, 16, 17],
    [5, 9, 10, 11, 12, 13, 14, 15, 16, 18],
    [5, 9, 10, 11, 12, 13, 14, 16, 17, 18],
    [5, 9, 10, 11, 13, 13, 14, 16, 17, 18],
    [5, 9, 10, 11, 13, 13, 15, 17, 17, 18],
    [5, 9, 10, 11, 13, 14, 15, 17, 17, 18],
    [5, 9, 10, 12, 13, 14, 15, 17, 18, 18],
    [5, 9, 10, 12, 13, 15, 15, 17, 18, 19],
    [5, 9, 10, 12, 13, 15, 16, 17, 19, 19],
    [5, 9, 10, 12, 14, 15, 16, 17, 19, 19],
    [5, 9, 10, 12, 14, 16, 16, 17, 19, 19],
    [5, 9, 10, 12, 14, 16, 17, 18, 19, 19],
    [5, 9, 10, 13, 14, 16, 17, 18, 19, 20],
    [5, 9, 10, 13, 15, 16, 17, 18, 19, 20],
    [5, 9, 10, 13, 15, 16, 17, 19, 20, 21],
    [6, 9, 10, 13, 15, 16, 18, 19, 20, 21],
    [6, 9, 10, 13, 16, 16, 18, 19, 20, 21],
    [6, 9, 10, 13, 16, 17, 18, 19, 20, 21],
    [6, 9, 10, 13, 16, 17, 18, 20, 21, 22],
    [6, 9, 10, 13, 16, 17, 19, 20, 22, 23],
    [6, 9, 10, 13, 16, 18, 19, 20, 22, 23],
    [6, 9, 10, 13, 16, 18, 20, 21, 22, 23],
    [6, 9, 10, 13, 17, 18, 20, 21, 22, 23],
    [6, 9, 10, 14, 17, 18, 20, 21, 22, 24],
    [6, 9, 11, 14, 17, 18, 20, 21, 23, 24],
    [6, 9, 11, 14, 17, 19, 20, 21, 23, 24],
    [6, 9, 11, 14, 17, 19, 21, 22, 23, 24],
    [7, 10, 11, 14, 17, 19, 21, 22, 23, 25],
    [7, 10, 12, 14, 17, 19, 21, 22, 24, 25],
    [7, 10, 12, 14, 18, 19, 21, 22, 24, 25],
    [7, 10, 12, 15, 18, 19, 21, 22, 24, 26],
    [7, 10, 12, 15, 18, 19, 21, 23, 25, 26],
    [7, 11, 13, 15, 18, 19, 21, 23, 25, 26],
    [7, 11, 13, 15, 18, 20, 21, 23, 25, 27],
    [8, 11, 13, 15, 18, 20, 22, 23, 25, 27],
    [8, 11, 13, 16, 18, 20, 22, 23, 25, 28],
    [8, 11, 14, 16, 18, 20, 22, 23, 26, 28],
    [8, 11, 14, 16, 19, 20, 22, 24, 26, 28],
    [8, 12, 14, 16, 19, 20, 22, 24, 26, 28],
    [8, 12, 15, 16, 19, 20, 22, 24, 27, 28],
    [8, 12, 15, 17, 19, 20, 22, 24, 27, 29],
    [8, 12, 15, 18, 19, 20, 22, 24, 27, 30],
] as const;

export function getPowerTable(power: number, offset = 0) {
    let power_table = [0, ...p_tbl_raw[power]];
    const last_elem = power_table[power_table.length - 1];
    if (offset > 0) {
        for (let i = 0; i < offset; i++) {
            power_table.shift();
            power_table.shift();
            power_table.unshift(0);
            power_table.push(last_elem);
        }
    }
    return power_table;
}

export function expectedPowerTable(power: number, offset = 0) {
    const power_table = getPowerTable(power, offset);
    if (power_table.length !== 11) {
        throw new Error(
            `Power ${power} table has length ${power_table.length}; expected 11 columns for sums 2..12.`
        );
    }
    const sum = power_table.reduce((acc, cell, colIndex) => {
        const sumValue = 2 + colIndex; // 3..12
        const prob =
            twoDSixProbabilities[sumValue as keyof typeof twoDSixProbabilities];
        return acc + cell * prob;
    }, 0);
    return sum;
}

export function expectedPowerTableRoll(
    power: number,
    crit = 0,
    offset = 0,
    bonus = 0
) {
    // math here assumes offset happens on first roll only, and that crit is never below 3 or above 12
    if (crit < 3 || crit > 12) {
        throw new Error("Crit is less than 3 or more than 12");
    }
    if (crit - offset < 2) {
        throw new Error("Offset causes crits on 2s");
    }
    const offset_crit = twoDSixAtLeastProbabilities[crit - offset]; // offset increases crit chance this is the same as decreasing crit number
    let   prob        = offset_crit; // first offset crit
    let   acc         = expectedPowerTable(power, offset); // first power roll
    
    const powerTable  = expectedPowerTable(power);
    const crit_chance = twoDSixAtLeastProbabilities[crit];
    while (prob * powerTable > 0.0001) {
        acc += prob * powerTable;
        prob *= crit_chance;
    }
    return acc + bonus * (35 / 36);
}

console.log(expectedPowerTableRoll(50, 0, 0, 38));
