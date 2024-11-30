import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    let result = 0;
    const markers = [];
    let index = 0;
    for (const letter of input) {
        markers.unshift(letter);
        index++;
        if (markers.length === 4) {
            if (new Set(markers).size == markers.length) {
                return index;
            } else {
                markers.length = 3;
            }
        }
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //1920 ~0.738ms
    })();
}
