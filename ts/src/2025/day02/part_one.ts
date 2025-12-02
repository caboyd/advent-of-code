import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';


function even_digits(v:number): boolean {
    return count_digits(v) % 2 == 0
}

function count_digits(v:number): number {
    let digits = 0;
    while(v > 0){
        v = Math.floor(v / 10);
        digits++;
    }
    return digits;
}

export const equation_one = (input: string): number => {
    let result = 0;
    const lines = input.split(",");
    for (const line of lines) {
        const [min ,max] = line.split("-").map(Number)
        if(even_digits(min) || even_digits(max))
        {
            for(let num = min; num <= max; num++)
            {
                if(!even_digits(num)) continue;
                const s = String(num);
                const mid = s.length / 2;
                const left = s.slice(0, mid);
                const right = s.slice(mid);

                if(left === right) { result += Number(num) }
            }
        }

    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //28846518423 ~191ms
    })();
}
