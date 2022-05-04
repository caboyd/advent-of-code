import {Results} from 'src/lib';

export const year = 2021;
export const day = 4;

export const results: Results = {
    one: 64084,
    two: 12833,
};

export const get_boards = (arr: string[]): number[][][] => {
    const boards = arr.map((x) =>
        x.split(/\r?\n/).map((y) =>
            y
                .trim()
                .split(/\s+/)
                .map((z) => Number(z) + 1),
        ),
    );
    return boards;
};

export const winning_board = (board: number[][]): boolean => {
    for (let i = 0; i < 5; i++) {
        //rows
        for (let j = 0; j < 5; j++) {
            if (board[i][j] > 0) break; //not in row
            if (j == 4) return true;
        }
        //cols
        for (let j = 0; j < 5; j++) {
            if (board[j][i] > 0) break; //not in col
            if (j == 4) return true;
        }
    }

    return false;
};
