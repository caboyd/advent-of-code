import {read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    return input
        .split(/\r?\n/)
        .map(n => Math.floor(Number(n) / 3) - 2)
        .reduce((sum, item) => sum + item);
};

if (require.main === module) {
    (async () => {
        console.log(`Result: ${equation_one(await read_input(year, day))}`);
    })();
}
