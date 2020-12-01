import {benchmark, read_input} from '../../lib';
import {day, permute, year} from './index';
import {IntCodeComputer} from '../../lib/IntCodeComputer/IntCodeComputer';

export const equation_two = async (input: string): Promise<number> => {
    const data = input.split(/,/).map((n) => Number(n));

    const count = 5;
    const pcs = Array<IntCodeComputer>(count);
    for (let i = 0; i < count; i++) {
        pcs[i] = new IntCodeComputer(data);
        pcs[i].silent_mode = true;
        pcs[i].pause_on_output_mode = true;
    }

    //get permutations
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const perms = permute([5, 6, 7, 8, 9]);

    let max = 0;
    for (const perm of perms) {
        let output = 0;
        for (let i = 0; i < count; i++) {
            pcs[i].load_from_backup();
            pcs[i].set_input_buffer([perm[i], output]);
            output = await pcs[i].run();
        }

        for (;;) {
            for (let i = 0; i < count; i++) {
                pcs[i].set_input_buffer([output]);
                output = await pcs[i].run();
            }
            if (pcs[4].is_halted()) {
                break;
            }
        }
        max = Math.max(output, max);
    }
    return max;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(async () => await equation_two(input))}`); //6489132 ~15.2ms
    })();
}
