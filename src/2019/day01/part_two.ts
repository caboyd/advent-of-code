import {read_input} from "src/lib";
import {day, year} from "./index";

export function rocket_equation_two(input: string): Number {
    return input
        .split(/\r?\n/)
        .map(n => {
            let fuel = Math.floor(Number(n) / 3) - 2;
            let remaining_mass = fuel;
            while (remaining_mass > 6){
                remaining_mass = Math.floor(Number(remaining_mass) / 3) - 2;
                fuel += remaining_mass;
            }
            return fuel;
        })
        .reduce((sum, item) => sum + item, 0);
}

if (require.main === module) {
    (async () => {
        console.log(`Result: ${rocket_equation_two(await read_input(year, day))}`);
    })();
}