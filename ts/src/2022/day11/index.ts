import {Results} from 'src/lib';

export const year = 2022;
export const day = 11;

export const results: Results = {
    one: 120384,
    two: 32059801242,
};

export function getOperationFunc(s: string): (value: number) => number {
    let text = s.split(' ');
    let op = text[0];
    let num = Number(text[1]);
    if (text[1].includes('old')) {
        switch (op) {
            case '+':
                return (v: number) => {
                    return v + v;
                };
            case '*':
                return (v: number) => {
                    return v * v;
                };
        }
    } else
        switch (op) {
            case '+':
                return (v: number) => {
                    return v + num;
                };
            case '*':
                return (v: number) => {
                    return v * num;
                };
        }

    throw 'bad operation data';
}

export function getTestFunc(divisor: number, monkey_true: number, monkey_false: number): (value: number) => number {
    return (v: number) => {
        if (v % divisor === 0) return monkey_true;
        return monkey_false;
    };
}

export type Monkey = {
    items: number[];
    operation: (value: number) => number;
    test: (value: number) => number;
    inspection_count: number;
};
