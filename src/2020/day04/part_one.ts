import {benchmark, read_input} from 'src/lib';
import {day, isPassport, year} from './index';


export const equation_one = (input: string): number => {
    const lines = input.split(/\r?\n\r?\n/);

    let count = 0;
    for (const line of lines) {
        const passport: Record<string, unknown> = {};
        line.split(/ |\r?\n/).map((s): void => {
            const [key, value] = s.split(':');
            passport[key] = value;
        });

        if (isPassport(passport)) count++;
    }

    return count;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //254 3.44ms
    })();
}
