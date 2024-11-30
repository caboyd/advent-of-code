import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const arr = input.split(/\r?\n/);

    const stack = [];
    let result = 0;
    for (const line of arr) {
        for (const c of line) {
            if (c === '{' || c == '(' || c == '[' || c == '<') {
                stack.unshift(c);
                continue;
            }
            const x = stack.shift();
            if (x == '{') {
                if (c == '}') continue;
                //console.log(`Expected }, but found ${c} instead.`);
                result += get_points(c);
                break;
            }
            if (x == '[') {
                if (c == ']') continue;
                //console.log(`Expected ], but found ${c} instead.`);
                result += get_points(c);
                break;
            }
            if (x == '<') {
                if (c == '>') continue;
                //console.log(`Expected >, but found ${c} instead.`);
                result += get_points(c);
                break;
            }
            if (x == '(') {
                if (c == ')') continue;
                //console.log(`Expected ), but found ${c} instead.`);
                result += get_points(c);
                break;
            }
        }
        stack.length = 0;
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //366027 ~1.58ms
    })();
}

const get_points = (c: string): number => {
    switch (c) {
        case ')':
            return 3;
        case ']':
            return 57;
        case '}':
            return 1197;
        case '>':
            return 25137;
        default:
            return 0;
    }
};
