import {read_input} from "../../lib";
import {day, year} from "./index";
import {equation} from "./part_one";

export const equation_two = async (input: string) : Promise<number> => {
	for(let noun = 0; noun < 100; noun++){
		for(let verb = 0; verb < 100; verb++){
			if(equation(input,noun,verb)[0] === 19690720){
				return noun * 100 + verb;
			}
		}
	}
	return 0;
};


if (require.main === module) {
	(async () => {
		console.log(`Result: ${await equation_two(await read_input(year, day))}`);
	})();
}
