import {benchmark, read_input} from 'src/lib';
import {day, year, get_boards, winning_board} from './index';

export const equation_one = (input: string): number => {
    const [head, ...rest] = input.split(/\r\n\r\n/);
    const guesses = head.split(',');
    const boards = get_boards(rest);

    for (const guess of guesses) {
        //mark guesses
        for (let board_id = 0; board_id < boards.length; board_id++) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    //we added 1 so we can use negatives to mark numbers including 0
                    if (boards[board_id][i][j] === +guess + 1) boards[board_id][i][j] *= -1;
                }
            }
        }

        //check for winner
        for (let board_id = 0; board_id < boards.length; board_id++) {
            if (winning_board(boards[board_id])) {
                let sum_of_unmarked = 0;
                for (const row of boards[board_id]) {
                    for (const item of row) {
                        if (item > 0) sum_of_unmarked += item - 1;
                    }
                }
                return sum_of_unmarked * +guess;
            }
        }
    }

    return 0;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //64084 ~8.52ms
    })();
}
