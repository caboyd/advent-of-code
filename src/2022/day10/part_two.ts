import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): string => {
    const lines = input.split(/\r?\n/);

    let buffer = '';
    let cycle = 0;
    let line_index = 0;
    let register = 1;
    let value_to_add = 0;
    let cycles_to_wait = 0;

    while (line_index < lines.length) {
        cycle++;
        cycles_to_wait--;

        if (cycles_to_wait == 0) register += value_to_add;
        let x_pos = (cycle - 1) % 40;

        if (x_pos == 0) buffer += '\n';
        if (x_pos >= register - 1 && x_pos <= register + 1) buffer += '#';
        else buffer += '.';

        if (cycles_to_wait > 0) continue;

        let [instruction, value] = lines[line_index++].split(' ');
        switch (instruction) {
            case 'addx':
                value_to_add = Number(value);
                cycles_to_wait = 2;
        }
    }
    console.log(buffer);
    return buffer;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //FGCUZREC ~0.24
    })();
}
