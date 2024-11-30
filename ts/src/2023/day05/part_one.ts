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

export const equation_one = (input: string): number => {
    let maps: MapBounds[] = [];
    const sections = input.split(/\r?\n\r?\n/);
    const seeds = sections.splice(0, 1)[0].split(' ').slice(1).map(Number);
    for (const section of sections) {
        const lines = section.split(/\r?\n/);
        const map_type = lines.splice(0, 1);
        const map_bound: MapBounds = {
            name: map_type[0],
            bounds: [],
            lowest_low: Number.MAX_SAFE_INTEGER,
            highest_high: 0,
        };
        maps.push(map_bound);
        for (const line of lines) {
            let [dest, src, range] = line.split(' ').map(Number);
            const bound: Bound = {
                lower: src,
                upper: src + range,
                offset: dest - src,
            };
            map_bound.bounds.push(bound);
            map_bound.lowest_low = Math.min(map_bound.lowest_low, bound.lower);
            map_bound.highest_high = Math.max(map_bound.highest_high, bound.upper);
        }
    }
    let lowest_location = Number.MAX_SAFE_INTEGER;
    for (const seed of seeds) {

        let seed_val = seed;

        for (const map of maps) {
            if (seed_val < map.lowest_low || seed_val > map.highest_high) continue;
            for (const bound of map.bounds) {
                if (seed_val < bound.lower || seed_val > bound.upper) continue;
                seed_val += bound.offset;
                break;
            }
        }
        if (seed_val < lowest_location) {
            lowest_location = seed_val;
        }
    }
    return lowest_location;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //173706076 ~0.958ms
    })();
}
