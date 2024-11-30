import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    const arr = input.split(/\r?\n/);
    let result = 0;

    for (let i = 0; i < arr.length - 2; i += 3) {
        let s1 = arr[i];
        let s2 = arr[i + 1];
        let s3 = arr[i + 2];
        for (const c of s1) {
            if (s2.includes(c) && s3.includes(c)) {
                let amount = 0;
                if (c.toLowerCase() === c) amount = 26 - (122 - c.charCodeAt(0));
                else amount = 52 - (90 - c.charCodeAt(0));
                result += amount;
                break;
            }
        }
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //2973 ~0.36ms
    })();
}
