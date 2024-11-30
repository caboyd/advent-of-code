import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

const WIDTH = 25;
const HEIGHT = 6;
const SIZE = WIDTH * HEIGHT;

export const equation_one = async (input: string): Promise<number> => {
    const arr = input.split('').map(Number);

    const layer_count = input.length / SIZE;
    let min_zero_count = SIZE;
    let min_id = 0;
    for (let i = 0; i < layer_count; i++) {
        let zero_count = 0;
        const end = (i + 1) * SIZE;
        for (let j = i * SIZE; j < end; j++) if (arr[j] === 0) zero_count++;
        if (zero_count < min_zero_count) {
            min_zero_count = zero_count;
            min_id = i;
        }
    }

    let one_count = 0;
    let two_count = 0;
    const end = (min_id + 1) * SIZE;
    for (let j = min_id * SIZE; j < end; j++) {
        if (arr[j] === 1) {
            one_count++;
        } else if (arr[j] === 2) {
            two_count++;
        }
    }

    return one_count * two_count;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(async () => await equation_one(input))}`); //2064 0.73ms
    })();
}
