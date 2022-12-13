import {benchmark, read_input} from 'src/lib';
import {compare, day, year} from './index';

export const equation_two = (input: string): number => {
    let lines = input.split(/\r?\n/);

    let index = 0;
    let total = 0;

    lines.push(`[[2]]`, `[[6]]`);
    lines = lines.filter((l) => l.length > 0);
    let arr = lines.map((l) => JSON.parse(l));

    arr.sort((a, b) => {
        return compare(a, b);
    });

    let result = 1;

    for (let i = 1; i <= arr.length; i++) {
        const s = JSON.stringify(arr[i - 1]);
        //console.log(i, s);
        if (s == '[[2]]' || s == `[[6]]`) result *= i;
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //24180 ~3.43ms
    })();
}
