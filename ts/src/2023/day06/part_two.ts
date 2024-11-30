import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    const lines = input.split(/\r?\n/);
    let nums = lines
        .map((m) =>
            m
                .split(/\w\:\s+/)[1]
                .split(/\s+/)
                .join(''),
        )
        .map(Number);
    let time = nums[0];
    let dist = nums[1];

    let lower = 0;
    let upper = 0;
    for (let t = 0; t <= time; t++) {
        let d = t * time - t * t;
        if (d > dist) {
            lower = t;
            break;
        }
    }
    for (let t = time; t > 0; t--) {
        let d = t * time - t * t;
        if (d > dist) {
            upper = t;
            break;
        }
    }

    return upper - lower + 1;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //49240091 ~17.46ms
    })();
}
