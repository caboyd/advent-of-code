import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const lines = input.split(/\r?\n/);

    let valid_heads = ['shiny gold bag'];
    let valid_heads_pre_length = 1;
    do {
        let valid_heads_snapshot = [...valid_heads];
        valid_heads_pre_length = valid_heads.length;
        outer: for (const line of lines) {
            const [head, tail] = line.split('s contain ');
            for (const valid_head of valid_heads_snapshot) {
                if (tail.includes(valid_head))
                    if (!valid_heads.includes(head)) {
                        valid_heads.push(head);
                        continue outer;
                    }
            }
        }
    } while (valid_heads_pre_length !== valid_heads.length);

    return valid_heads.length - 1;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //172 60.29ms
    })();
}
