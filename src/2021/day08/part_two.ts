import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    const arr = input.split(/\r?\n/);

    let total = 0;
    for (const line of arr) {
        const segments = Array(7).fill('');
        const words: string[][] = Array(8)
            .fill('')
            .map(() => []);
        for (const item of line.split(' | ')[0].split(' ')) {
            words[item.length].push(item);
        }
        //deduced logic to find which letter belongs to which segment
        segments[0] = find_unique(...words[2], ...words[3]);
        const c_069 = find_common(...words[6]);
        segments[5] = find_common(...words[2], c_069);
        segments[2] = find_unique(...words[2], segments[5]);
        const ic_069 = find_inverse_common(...words[6]);
        const temp = find_common(ic_069, ...words[4]);
        segments[4] = find_unique(temp, ic_069);
        segments[3] = find_unique(ic_069, segments[2], segments[4]);
        segments[1] = find_unique(...words[5], segments[4]);
        segments[6] = find_unique(...segments, 'abcdefg');

        let result = '';
        for (const item of line.split(' | ')[1].trim().split(' ')) {
            result += decode(item, segments);
        }
        total += +result;
    }

    return total;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //940724 ~7.09ms
    })();
}

const find_unique = (...args: string[]): string => {
    const letters = count_letters(args);

    let result = '';
    letters.forEach((v, k) => {
        if (v === 1) result += k;
    });
    return result;
};

const find_common = (...args: string[]): string => {
    const letters = count_letters(args);

    let result = '';
    letters.forEach((v, k) => {
        if (v >= args.length) result += k;
    });
    return result;
};

const find_inverse_common = (...args: string[]): string => {
    const letters = count_letters(args);

    let result = '';
    letters.forEach((v, k) => {
        if (v <= args.length - 1) result += k;
    });
    return result;
};

const decode = (code: string, segments: string[]): number => {
    const a = Array(7).fill(0);
    for (const c of code) {
        a[segments.indexOf(c)]++;
    }
    const b = a.join('');
    const r = parseInt(b, 2);

    //determine which number is active using truth table to binary to decimal
    // 0	1	2	3	4	5	6   <- segment id
    //64	32	16	8	4	2	1   <- binary value
    //a	    b	c	d	e	f	g	display num = decimal value
    //1	    1	1		1	1	1	0 = 119
    //		    1			1		1 = 18
    //1		    1	1	1		1	2 = 93
    //1		    1	1		1	1	3 = 91
    //	    1	1	1		1		4 = 58
    //1	    1		1		1	1	5 = 107
    //1	    1		1	1	1	1	6 = 111
    //1		    1			1		7 = 82
    //1	    1	1	1		1	1	9 = 127
    //1	    1	1	1	1	1	1	8 = 123
    if (r == 119) return 0;
    else if (r == 18) return 1;
    else if (r == 93) return 2;
    else if (r == 91) return 3;
    else if (r == 58) return 4;
    else if (r == 107) return 5;
    else if (r == 111) return 6;
    else if (r == 82) return 7;
    else if (r == 127) return 8;
    else if (r == 123) return 9;
    return -1;
};

const count_letters = (args: string[]): Map<string, number> => {
    const letters = new Map();
    const str = args.join('');
    for (const s of str) {
        letters.set(s, (letters.get(s) || 0) + 1);
    }
    return letters;
};
