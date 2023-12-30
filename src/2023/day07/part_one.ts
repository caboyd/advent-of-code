import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

function getScore(cards: string) {
    let primary_score = 0;
    if (isFive(cards)) primary_score = 7;
    else if (isFour(cards)) primary_score = 6;
    else if (isFull(cards)) primary_score = 5;
    else if (isThree(cards)) primary_score = 4;
    else if (isTwoPair(cards)) primary_score = 3;
    else if (isTwo(cards)) primary_score = 2;
    else primary_score = 1;

    let high_cards_score = 0;
    high_cards_score =
        Value(cards[0]) * 10e7 +
        Value(cards[1]) * 10e5 +
        Value(cards[2]) * 10e3 +
        Value(cards[3]) * 10e1 +
        Value(cards[4]);
    return [primary_score, high_cards_score];
}

function isFive(cards: string) {
    return isX(cards, 5);
}
function isFour(cards: string) {
    return isX(cards, 4);
}

function isThree(cards: string) {
    return isX(cards, 3);
}

function isTwo(cards: string) {
    return isX(cards, 2);
}

function Value(card: string) {
    switch (card) {
        case 'A':
            return 14;
        case 'K':
            return 13;
        case 'Q':
            return 12;
        case 'J':
            return 11;
        case 'T':
            return 10;
        default:
            return +card;
    }
}

function isFull(cards: string) {
    let count: Record<string, number> = {};
    for (const c of cards) {
        count[c] = count[c] ? count[c] + 1 : 1;
    }
    let three = false;
    let two = false;
    for (const num of Object.values(count)) {
        if (num >= 3) three = true;
        else if (num >= 2) two = true;
    }
    return three && two;
}

function isTwoPair(cards: string) {
    let count: Record<string, number> = {};
    for (const c of cards) {
        count[c] = count[c] ? count[c] + 1 : 1;
    }
    let pairs = 0;
    for (const num of Object.values(count)) {
        if (num >= 2) pairs++;
    }
    return pairs >= 2;
}

function isX(cards: string, amount: number) {
    let count: Record<string, number> = {};

    for (const c of cards) {
        count[c] = count[c] ? count[c] + 1 : 1;
    }
    for (const num of Object.values(count)) {
        if (num >= amount) return true;
    }
    return false;
}

export const equation_one = (input: string): number => {
    let result = 0;
    const lines = input.split(/\r?\n/);

    let bets: {hand: string; bet: number; score: number; high: number}[] = [];
    for (const line of lines) {
        let [hand, bet] = line.split(' ');
        let [score, high] = getScore(hand);
        bets.push({hand: hand, bet: Number(bet), score: score, high: high});
    }

    bets.sort((a, b) => {
        if (a.score != b.score) return a.score - b.score;
        return a.high - b.high;
    });

    for (let i = 0; i < bets.length; i++) {
        result += bets[i].bet * (i + 1);
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //251121738 ~13.0ms
    })();
}
