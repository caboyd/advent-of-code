import {day, results, year} from "../index";
import {equation} from "../part_one";

describe(`${year} - Day${day} Part One`, () => {
	describe('', () => {
		it('1,0,0,0,99 resolves to 2,0,0,0,99', () => {
			expect(equation('1,0,0,0,99')).toStrictEqual([2,0,0,0,99]);
		});

		it('2,3,0,3,99 resolves to 2,3,0,6,99', () => {
			expect(equation('2,3,0,3,99')).toStrictEqual([2,3,0,6,99]);
		});

		it('2,4,4,5,99,0 resolves to 2,4,4,5,99,9801', () => {
			expect(equation('2,4,4,5,99,0')).toStrictEqual([2,4,4,5,99,9801]);
		});

		it('1,9,10,3,2,3,11,0,99,30,40,50 resolves to 3500,9,10,70,2,3,11,0,99,30,40,50', () => {
			expect(equation('1,9,10,3,2,3,11,0,99,30,40,50')).toStrictEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
		});
	})
});
