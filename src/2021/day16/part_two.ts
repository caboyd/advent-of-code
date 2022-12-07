import {benchmark, read_input} from 'src/lib';
import {day, parsePacket, Pointer, year} from './index';

export const equation_two = (input: string): number => {
    let binary = '';
    for (const c of input) binary += parseInt(c, 16).toString(2).padStart(4, '0');
    let ptr: Pointer = {ptr: 0};
    return parsePacket(binary, ptr).value;
};
if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //1148595959144 ~1.03ms
    })();
}
