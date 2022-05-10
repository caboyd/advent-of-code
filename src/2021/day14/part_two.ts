import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

interface PolymerData {
    output_pairs: string[];
    count: number;
}

export const equation_two = (input: string): number => {
    const [template, pairs] = input.split(/\r?\n\r?\n/);

    // console.log(temp);
    // console.log(pairs);
    const temp_lookup = new Map<string, string>();
    let lookup = new Map<string, PolymerData>();
    for (const pair of pairs.split(/\r?\n/)) {
        const [a, b] = pair.split(' -> ');
        temp_lookup.set(a, b);
    }

    for (const [key, value] of temp_lookup.entries()) {
        const data = {output_pairs: [key[0] + value, value + key[1]], count: 0};
        lookup.set(key, data);
    }
    for (let i = 0; i < template.length - 1; i++) {
        if (lookup.has(template[i] + template[i + 1])) {
            lookup.get(template[i] + template[i + 1])!.count++;
        }
    }
    for (let i = 0; i < 40; i++) {
        const temp_map = new Map();
        for (const [key, value] of lookup.entries()) {
            temp_map.set(key, {output_pairs: [...value.output_pairs], count: 0});
        }
        for (const [key, value] of lookup.entries()) {
            if (value.count === 0) continue;
            for (const pair of value.output_pairs) {
                temp_map.get(pair)!.count += value.count;
            }
            value.count = 0;
        }

        lookup = temp_map;
    }

    const count: any = {};

    for (const [key, value] of lookup.entries()) {
        if (count[key[0]] === undefined) count[key[0]] = value.count;
        else count[key[0]] += value.count;
    }
    count[template[template.length - 1]]++;

    let min = Infinity;
    let max = -Infinity;

    for (const x in count) {
        if (count[x] < min) min = count[x];
        if (count[x] > max) max = count[x];
    }
    return max - min;
};
if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //3353146900153 ~4.32ms
    })();
}
