import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const lines = input.split(/\r?\n/);

    let program_counter = 0;
    let accumulator = 0;

    const visited = new Array(lines.length);

    do {
        if (visited[program_counter] === true) break;
        visited[program_counter] = true;
        const [instruction, amount_s] = lines[program_counter].split(' ');
        const amount = parseInt(amount_s);

        if (instruction === 'nop') {
            program_counter++;
        } else if (instruction === 'acc') {
            accumulator += amount;
            program_counter++;
        } else if (instruction === 'jmp') {
            program_counter += amount;
        }
    } while (program_counter < lines.length);

    return accumulator;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //1816 0.42ms
    })();
}
