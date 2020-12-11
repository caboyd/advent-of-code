/* eslint-disable @typescript-eslint/no-magic-numbers */
import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    const lines = input.split(/\r?\n/);

    let accumulator = 0;
    let swap_index = 0;
    do {
        let swapped = false;
        let program_counter = 0;
        accumulator = 0;

        const visited = new Array(lines.length);

        do {
            if (visited[program_counter] === true) break;
            visited[program_counter] = true;
            const [instruction, amount_s] = lines[program_counter].split(' ');
            const amount = parseInt(amount_s);

            if (instruction === 'nop') {
                if (!swapped && program_counter === swap_index) {
                    swapped = true;
                    program_counter += amount;
                } else program_counter++;
            } else if (instruction === 'acc') {
                accumulator += amount;
                program_counter++;
            } else if (instruction === 'jmp') {
                if (!swapped && program_counter === swap_index) {
                    swapped = true;
                    program_counter++;
                } else program_counter += amount;
            }
        } while (program_counter < lines.length);
        swap_index++;

        if (program_counter >= lines.length) break;
    } while (swap_index < lines.length);

    return accumulator;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //1149 41.41ms
    })();
}
