import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

let lookup = {
    ['one']: 1,
    ['two']: 2,
    ['three']: 3,
    ['four']: 4,
    ['five']: 5,
    ['six']: 6,
    ['seven']: 7,
    ['eight']: 8,
    ['nine']: 9,
};
let rlookup = {
    ['enin']: 9,
    ['thgie']: 8,
    ['neves']: 7,
    ['xis']: 6,
    ['evif']: 5,
    ['ruof']: 4,
    ['eerht']: 3,
    ['owt']: 2,
    ['eno']: 1,
};
let entries = Object.entries(lookup);
let rentries = Object.entries(rlookup);

export const equation_two = (input: string): number => {
    let result = 0;
    let lines = input.split(/\r?\n/);
    for (let line of lines) {
        let first = 0;
        let last = 0;
        for (const c of line) {
            let num = Number(c);
            if (num) {
                if (!first) first = num;
                last = num;
            }
        }
        let s = line.split(/\d/);
        let last_index = 1000;
        for (const [k, v] of entries) {
            let index = s[0].indexOf(k);
            if (index != -1 && index < last_index) {
                first = v;
                last_index = index;
            }
        }
        let s2 = s[s.length - 1].split('').reverse().join('');
        last_index = 1000;
        for (const [k, v] of rentries) {
            let index = s2.indexOf(k);
            if (index != -1 && index < last_index) {
                last = v;
                last_index = index;
            }
        }
        result += first * 10 + last;
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //53894 ~6.32ms
    })();
}
