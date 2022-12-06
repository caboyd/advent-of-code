import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): string => {
    const arr = input.split(/\r?\n\r?\n/);
    let result = '';
    const lines = arr[0].split(/\r?\n/);
    const lines2 = arr[1].split(/\r?\n/);
    const stack_count = (lines[0].length + 1) / 4;
    const stacks: string[][] = new Array(stack_count).fill(null).map(() => new Array());
    //parse

    for (const line of lines) {
        for (let i = 0; i < stack_count; i++) {
            const letter = line[i * 4 + 1];
            //if a letter put it on right stack
            if (letter !== ' ') stacks[i].unshift(letter);
        }
    }
    for (let i = 0; i < stack_count; i++) {
        //pop extra the number off the end
        stacks[i].shift();
    }
    for (const line of lines2) {
        const split_from = line.split(' from ');
        const [from_spot, to_spot] = split_from[1].split(' to ').map(Number);
        const amount = Number(split_from[0].split('move ')[1]);
        for (let i = 0; i < amount; i++) {
            const letter = stacks[from_spot - 1].pop()!;
            stacks[to_spot - 1].push(letter);
        }
    }
    for (let i = 0; i < stack_count; i++) {
        //get top crate
        result += stacks[i].pop();
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //VJSFHWGFT ~1.29ms
    })();
}
