import {benchmark, read_input} from '../../lib';
import {day, equation, part_one_input, year} from './index';

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(async () => await equation(input, [part_one_input]))}`); //15426686 ~1.9ms
    })();
}
