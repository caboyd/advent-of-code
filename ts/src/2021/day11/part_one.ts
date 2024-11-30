import {benchmark, read_input} from 'src/lib';
import {day, year, flash} from './index';

export const equation_one = (input: string): number => {
    const arr = input.split(/\r?\n/).map((x) => x.trim().split('').map(Number));

    let result = 0;
    for (let i = 0; i < 100; i++) {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                arr[y][x]++;
                if (arr[y][x] === 10) {
                    flash(arr, x, y);
                }
            }
        }
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (arr[y][x] < 0) {
                    arr[y][x] = 0;
                    result++;
                }
            }
        }
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //1613 ~6.07ms
    })();
}
