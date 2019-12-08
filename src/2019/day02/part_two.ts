import {benchmark, read_input} from '../../lib';
import {day, year} from './index';
import {IntCodeComputer} from '../../lib/IntCodeComputer/IntCodeComputer';

const noun_max = 100;
const verb_max = 100;
const gravity_assist_output = 19690720;

export const equation_two = (input: string): number => {
    const data = input.split(/,/).map(n => Number(n));
    const pc = new IntCodeComputer(data);

    for (let noun = 0; noun < noun_max; noun++) {
        for (let verb = 0; verb < verb_max; verb++) {
            pc.load_from_backup();
            pc.apply_verb(verb);
            pc.apply_noun(noun);
            pc.run();
            if (pc.peek() === gravity_assist_output) return noun * verb_max + verb;
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
