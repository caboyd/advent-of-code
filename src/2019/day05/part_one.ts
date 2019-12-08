import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    return 0;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${benchmark(() => equation_one(input))}`); //1955 ~29ms
    })();
}
