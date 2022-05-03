import {benchmark, read_input} from 'src/lib';
import {day, get_boards, winning_board, year} from './index';

export const equation_two = (input: string): number => {
    const [head, ...rest] = input.split(/\r\n\r\n/);
    const guesses = head.split(',');
    let boards = get_boards(rest);
    let winner = -1;

    for (const guess of guesses) {
        //mark guesses
        for (let board_id = 0; board_id < boards.length; board_id++) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (boards[board_id][i][j] === +guess + 1) boards[board_id][i][j] *= -1;
                }
            }
        }

        if (winner === -1) {
            let b = Array.from(Array(100).keys());
            //check for 99 winners
            for (let board_id = 0; board_id < boards.length; board_id++) {
                if (winning_board(boards[board_id])) {
                    b = b.filter((x) => x !== board_id);
                    if (b.length === 1) {
                        winner = b[0];
                        //purge all 99 winners
                        boards = [boards[b[0]]];
                    }
                }
            }
        } else {
            //check for last winner
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
    }
    return 0;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //12833 ~22.7ms
    })();
}
