import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const [temp, pairs] = input.split(/\r?\n\r?\n/);

    const lookup = new Map<string, string>();
    for (const pair of pairs.split(/\r?\n/)) {
        const [a, b] = pair.split(' -> ');
        lookup.set(a, b);
    }

    let s = temp;
    for (let i = 0; i < 10; i++) {
        let s2 = '';
        for (let j = 0; j < s.length - 1; j++) {
            const x = lookup.get(s[j] + s[j + 1]);
            if (x !== undefined) {
                s2 += s[j] + x;
            }
        }
        s2 += s[s.length - 1];
        s = s2;
    }

    const count: any = {};
    for (const c of s) {
        if (count[c]) count[c]++;
        else count[c] = 1;
    }
    let min = Infinity;
    let max = -Infinity;

    for (const x in count) {
        if (count[x] < min) min = count[x];
        if (count[x] > max) max = count[x];
    }
    return max - min;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //2915 ~7.24ms
    })();
}
