import {benchmark, read_input} from '../../lib';
import {day, noun, verb, year} from './index';
import {IntCodeComputer} from '../../lib/IntCodeComputer/IntCodeComputer';

export const equation_one = (
    input: string,
    noun: number | undefined = undefined,
    verb: number | undefined = undefined,
): number[] => {
    const data = input.split(/,/).map(n => Number(n));

    const pc = new IntCodeComputer(data);
    if (noun) pc.apply_noun(noun);
    if (verb) pc.apply_verb(verb);
    pc.run();

    return Array.from(pc.read_memory());
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${benchmark(() => equation_one(input, noun, verb))}`); //3716293 ~0.14 ms
    })();
}
