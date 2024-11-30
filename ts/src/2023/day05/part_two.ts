import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

type MapBounds = {
    name?: string;
    bounds: Bound[];
    lowest_low: number;
    highest_high: number;
};

type Bound = {
    lower: number; //source
    upper: number; //source + range
    offset: number; //dest - source
};

type SeedRange = {
    seed: number;
    range: number;
};

export const equation_two = (input: string): number => {
    let maps: MapBounds[] = [];
    const sections = input.split(/\r?\n\r?\n/);
    const seeds = sections.splice(0, 1)[0].split(' ').slice(1).map(Number);

    const seed_ranges: SeedRange[] = [];
    for (let i = 0; i < seeds.length; i += 2) {
        let seed = seeds[i];
        let range = seeds[i + 1];
        seed_ranges.push({seed: seed, range: range});
    }

    for (const section of sections) {
        const lines = section.split(/\r?\n/);
        const map_type = lines.splice(0, 1);
        const map_bound: MapBounds = {
            name: map_type[0],
            bounds: [],
            lowest_low: Number.MAX_SAFE_INTEGER,
            highest_high: 0,
        };
        maps.unshift(map_bound);
        for (const line of lines) {
            let [dest, src, range] = line.split(' ').map(Number);
            const bound: Bound = {
                lower: src,
                upper: src + range,
                offset: dest - src,
            };
            map_bound.bounds.push(bound);
        }
    }
    let seed_val = 0;
    let index = 0;
    //guess a starting point
    let min = 1
    outer: for (index = min; index < Math.pow(10,8); index++) {
        seed_val = index;
        for (const map of maps) {
            for (const bound of map.bounds) {
                let src_val = seed_val - bound.offset;
                if (src_val < bound.lower || src_val > bound.upper) continue;
                seed_val = src_val;
                break;
            }
        }
        for (const seed of seed_ranges) {
            if (seed_val >= seed.seed && seed_val <= seed.seed + seed.range) break outer;
        }
    }
    return index;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //11611182 ~2388ms
    })();
}
