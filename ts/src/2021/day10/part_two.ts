import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    const arr = input.split(/\r?\n/).map((x) => x.trim());
    const good_lines = [];
    const stack = [];

    for (const line of arr) {
        let bad = false;
        for (const c of line) {
            if (c === '{' || c == '(' || c == '[' || c == '<') {
                stack.unshift(c);
                continue;
            }
            const x = stack.shift();
            if (x == '{') {
                if (c == '}') continue;
                bad = true;
                break;
            }
            if (x == '[') {
                if (c == ']') continue;
                bad = true;
                break;
            }
            if (x == '<') {
                if (c == '>') continue;
                bad = true;
                break;
            }
            if (x == '(') {
                if (c == ')') continue;
                bad = true;
                break;
            }
        }
        stack.length = 0;
        if (!bad) good_lines.push(line);
    }

    let points = Array(good_lines.length).fill(0);

    for (const i in good_lines) {
        for (const c of good_lines[i]) {
            if (c === '{' || c == '(' || c == '[' || c == '<') {
                stack.unshift(c);
                continue;
            }
            stack.shift();
        }
        for (const c of stack) {
            points[i] = get_points(points[i], c);
        }
        stack.length = 0;
    }

    points = points.sort((a, b) => a - b);
    return points[Math.floor(points.length / 2)];
};
if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //1118645287 ~2.33ms
    })();
}

const get_points = (current_points: number, c: string): number => {
    const result = (current_points *= 5);
    switch (c) {
        case '(':
            return result + 1;
        case '[':
            return result + 2;
        case '{':
            return result + 3;
        case '<':
            return result + 4;
        default:
            return 0;
    }
};
