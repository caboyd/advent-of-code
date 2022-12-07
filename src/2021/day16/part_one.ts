import {benchmark, read_input} from 'src/lib';
import {day, parsePacket, Pointer, year} from './index';

export const equation_one = (input: string): number => {
    let binary = '';
    for (const c of input) binary += parseInt(c, 16).toString(2).padStart(4, '0');
    let ptr: Pointer = {ptr: 0};
    return parsePacket(binary, ptr).version_sum;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //895 ~0.88ms
    })();
}
