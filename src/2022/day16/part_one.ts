import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';


export const equation_one = (input: string): number => {
    let lines = input.split(/\r?\n/);


    return 0;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //4737567 ~1333.82ms
    })();
}
