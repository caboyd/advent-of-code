import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    return 0;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //1319 ~34ms
    })();
}
