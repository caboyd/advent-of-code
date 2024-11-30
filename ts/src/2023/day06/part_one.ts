import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    let result = 1;
    const lines = input.split(/\r?\n/);
    let times = lines[0]
        .split(/Time\:\s+/)[1]
        .split(/\s+/)
        .map(Number);
    let dists = lines[1]
        .split(/Distance\:\s+/)[1]
        .split(/\s+/)
        .map(Number);
    for (let i = 0; i < times.length; i++) {
        let time = times[i];
        let dist = dists[i];
        let count = 0;
        for (let t = 0; t <= time; t++) {
            let d = t * time - t * t;
            if (d > dist) count++;
        }

        result *= count;
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //781200 ~0.39ms
    })();
}
