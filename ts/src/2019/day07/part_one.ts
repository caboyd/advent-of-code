import {benchmark, read_input} from '../../lib';
import {day, permute, year} from './index';
import {IntCodeComputer} from '../../lib/IntCodeComputer/IntCodeComputer';

export const equation_one = async (input: string): Promise<number> => {
    const pc = IntCodeComputer.fromInput(input);
    pc.silent_mode = true;
    //get permutations
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const perms = permute([0, 1, 2, 3, 4]);

    let max = 0;
    for (const perm of perms) {
        let output = 0;
        for (const input of perm) {
            pc.load_from_backup();
            pc.set_input_buffer([input, output]);
            output = await pc.run();
        }
        max = Math.max(output, max);
    }

    return max;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(async () => await equation_one(input))}`); //14902 ~5.2ms
    })();
}
