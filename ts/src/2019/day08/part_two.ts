import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

const WIDTH = 25;
const HEIGHT = 6;
const SIZE = WIDTH * HEIGHT;

export const equation_two = async (input: string): Promise<number[]> => {
    const arr = input.split('').map(Number);

    const image = Array(SIZE);

    const layer_count = input.length / SIZE;

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < layer_count; j++) {
            if (arr[j * SIZE + i] !== 2) {
                image[i] = arr[j * SIZE + i];
                break;
            }
        }
    }

    return image;
};
if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(async () => await equation_two(input))}`); //KAUZA ~0.6ms
    })();
}
