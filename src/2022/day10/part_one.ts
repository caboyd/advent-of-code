import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const lines = input.split(/\r?\n/);

    let cycle = 0;
    let line_index = 0;
    let signal_strength = 0;
    let register = 1;
    let value_to_add = 0;
    let cycles_to_wait = 0;

    while (line_index < lines.length) {
        cycle++;
        cycles_to_wait--;

        if (cycles_to_wait == 0) register += value_to_add;
        if ((cycle - 20) % 40 == 0) signal_strength += cycle * register;
        if (cycles_to_wait > 0) continue;

        let [instruction, value] = lines[line_index++].split(' ');
        switch (instruction) {
            case 'addx':
                value_to_add = Number(value);
                cycles_to_wait = 2;
        }
    }

    return signal_strength;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //17380 ~0.28
    })();
}
