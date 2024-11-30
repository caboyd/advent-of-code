import {benchmark, read_input} from 'src/lib';
import {day, getOperationFunc, getTestFunc, Monkey, year} from './index';



export const equation_one = (input: string): number => {
    let monkey_text = input.split(/\r?\n\r?\n/);

    let monkeys: Monkey[] = [];
    //read in all monkeys
    for (const text of monkey_text) {
        let starting_items = text.split('Starting items: ')[1].split(/\r?\n/)[0].split(', ').map(Number);
        let op = text.split('Operation: new = old ')[1].split(/\r?\n/)[0];
        let test_lines = text.split('Test: divisible by ')[1].split(/\r?\n/);
        let div_num = Number(test_lines[0]);
        let true_monkey = Number(test_lines[1].split('true: throw to monkey ')[1].split(/\r?\n/)[0]);
        let false_monkey = Number(test_lines[2].split('false: throw to monkey ')[1].split(/\r?\n/)[0]);
        monkeys.push({
            items: [...starting_items],
            test: getTestFunc(div_num, true_monkey, false_monkey),
            operation: getOperationFunc(op),
            inspection_count: 0,
        });
    }
    for (let i = 0; i < 20; i++) {
        for (const monkey of monkeys) {
            for (const item of monkey.items) {
                let item_clone = monkey.operation(item);
                item_clone = Math.floor(item_clone / 3);
                const throw_to = monkey.test(item_clone);
                monkeys[throw_to].items.push(item_clone);
                monkey.inspection_count++;
            }
            monkey.items = [];
        }
    }

    monkeys.sort((a, b) => {
        return b.inspection_count - a.inspection_count;
    });

    return monkeys[0].inspection_count * monkeys[1].inspection_count;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //120384 ~0.78ms
    })();
}
