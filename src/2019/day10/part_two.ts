import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

export const equation_two = async (input: string): Promise<number> => {
    return 0;
};
if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(async () => await equation_two(input))}`); //
    })();
}
