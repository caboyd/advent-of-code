import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    const groups = input.split(/\r?\n\r?\n/);

    let sum = 0;
    for (const group of groups) {
        const answer = new Map<string, number>();
        const people = group.split(/\r?\n/).length;
        const line = group.replace(/\r?\n/g, '');
        for (const char of line) {
            if (answer.has(char)) {
                answer.set(char, answer.get(char)! + 1);
            } else answer.set(char, 1);
        }
        for (const i of answer.entries()) {
            if (i[1] === people) sum++;
        }
    }
    return sum;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //3464 9.09ms
    })();
}
