/* eslint-disable @typescript-eslint/no-magic-numbers */
import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    const lines = input.split(/\r?\n/);

    let valid_heads: Array<{key: string; value: number}> = [{key: 'shiny gold bag', value: 1}];
    let answer = 0;
    do {
        for (const line of lines) {
            const [head, tail] = line.split('s contain ');
            for (const valid_head of valid_heads) {
                if (head.includes(valid_head.key)) {
                    const mult = valid_heads
                        .filter((head) => head.key === valid_head.key)
                        .reduce((a, b) => a + b.value, 0);
                    valid_heads = valid_heads.filter((head) => head.key !== valid_head.key);
                    if (tail.trim() === 'no other bags.') continue;
                    //multiply answer
                    const nums = tail.match(/\d/g);
                    if (nums) answer = answer + mult * nums.reduce((a, b) => a + Number(b), 0);
                    else answer += valid_head.value;
                    //add all tails to valid heads
                    const rest = tail.match(/([^,\d][A-Za-z ]+)/g);

                    const rest_num = tail.match(/(\d+)/g);
                    if (rest && rest_num) {
                        for (let i = 0; i < rest.length; i++) {
                            const item = rest[i];
                            const num = Number(rest_num[i]);
                            if (item[item.length - 1] === 's')
                                valid_heads.push({key: item.slice(0, -1).trim(), value: num * mult});
                            else valid_heads.push({key: item.trim(), value: num * mult});
                        }
                    }

                    //console.log(valid_heads);
                    break;
                }
            }
        }
    } while (0 !== valid_heads.length);

    return answer;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //39645 76.2ms
    })();
}
