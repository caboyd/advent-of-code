import {benchmark, read_input} from '../../lib';
import {day, year} from './index';
import {compute} from './part_one';

const noun_max = 100;
const verb_max = 100;
const gravity_assist_output = 19690720;

export const equation_two = (input: string): number => {
    const data = input.split(/,/).map(n => Number(n));
    const buffer = new Uint32Array(data.length);
    for (let noun = 0; noun < noun_max; noun++) {
        for (let verb = 0; verb < verb_max; verb++) {
            for (let i = 0; i < buffer.length; i++) buffer[i] = data[i];

            if (compute(buffer, noun, verb)[0] === gravity_assist_output) {
                return noun * verb_max + verb;
            }
        }
    }
    return 0;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${benchmark(() => equation_two(input))}`); //6429 ~11ms
    })();
}
