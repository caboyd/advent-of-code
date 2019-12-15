import {benchmark, read_input} from '../../lib';
import {day, noun, verb, year} from './index';
import {IntCodeComputer} from '../../lib/IntCodeComputer/IntCodeComputer';

export const equation_one = async (
    input: string,
    noun: number | undefined = undefined,
    verb: number | undefined = undefined,
): Promise<number[]> => {
    const pc = IntCodeComputer.fromInput(input);
    pc.parameter_mode = false;
    if (noun) pc.apply_noun(noun);
    if (verb) pc.apply_verb(verb);
    await pc.run();
    return pc.read_memory();
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(async () => await equation_one(input, noun, verb))}`); //3716293 ~0.14 ms
    })();
}
