import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    let arr = input.split(/\r?\n/);

    let index = 0;
    while (true) {
        let count = 0;
        for (const s of arr) {
            count += +s[index] > 0 ? 1 : -1;
        }
        arr = arr.filter((item) => {
            if (count >= 0) return Number(item[index]) == 1;
            else return Number(item[index]) == 0;
        });
        if (arr.length == 1 || index == 11) break;
        index++;
    }
    const oxygen = arr[0];
    arr = input.split(/\r?\n/);

    index = 0;
    while (true) {
        let count = 0;
        for (const s of arr) {
            count += +s[index] > 0 ? 1 : -1;
        }
        arr = arr.filter((item) => {
            if (count >= 0) return Number(item[index]) == 0;
            else return Number(item[index]) == 1;
        });
        if (arr.length == 1 || index == 11) break;
        index++;
    }
    const co2 = arr[0];
    return parseInt(oxygen, 2) * parseInt(co2, 2);
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //4245351 ~0.87ms
    })();
}
