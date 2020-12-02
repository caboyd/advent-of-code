import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const lines = input.split(/\r?\n/);

    let correct_passwords = 0;

    for (const line of lines) {
        const parts = line.split(': ');
        const letter = parts[0].charAt(parts[0].length - 1);
        parts[0] = parts[0].substring(0, parts[0].length - 1);
        const [min, max] = parts[0].split('-').map(Number);

        let count = 0;
        for (const char of parts[1]) {
            if (char === letter) count++;
        }
        if (count <= max && count >= min) correct_passwords++;
    }

    return correct_passwords;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //493 2.52ms
    })();
}
