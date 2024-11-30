import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    const lines = input.split(/\r?\n/);

    let correct_passwords = 0;

    for (const line of lines) {
        const parts = line.split(': ');
        const letter = parts[0].charAt(parts[0].length - 1);
        parts[0] = parts[0].substring(0, parts[0].length - 1);
        const [index_1, index_2] = parts[0].split('-').map(Number);

        if (parts[1][index_1 - 1] === letter && parts[1][index_2 - 1] !== letter) correct_passwords++;
        if (parts[1][index_1 - 1] !== letter && parts[1][index_2 - 1] === letter) correct_passwords++;
    }

    return correct_passwords;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //593 ~2.22ms
    })();
}
