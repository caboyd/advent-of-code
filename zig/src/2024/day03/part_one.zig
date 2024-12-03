const std = @import("std");
const split = std.mem.splitSequence;

pub fn main() !void {
    const data = @embedFile("./resources/input.txt");
    //const data = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

    var result: u32 = 0;
    var i: usize = 0;
    while (i < data.len) : (i += 1) {
        if (data[i + 0] != 'm') continue;
        if (data[i + 1] != 'u') continue;
        if (data[i + 2] != 'l') continue;
        if (data[i + 3] != '(') continue;
        i = i + 4;

        var index_of_bracket: usize = 0;
        var index_of_comma: usize = 0;
        //find index of closing bracket
        var curr: usize = 0;
        for (i..@min(i + 8, data.len)) |j| {
            curr = j;

            if (data[curr] == ',') {
                index_of_comma = curr;
                continue;
            }
            if (index_of_comma > 0 and data[curr] == ')') {
                index_of_bracket = curr;
                break;
            }
        }
        if (index_of_bracket == 0 or index_of_comma == 0) {
            continue;
        }
        //std.debug.print("{},{}\n", .{i,curr});
        const first_num = std.fmt.parseUnsigned(u32, data[i..index_of_comma], 10) catch {
            std.debug.print("bad first num :{s}\n", .{data[i..index_of_comma]});
            continue;
        };
        const second_num = std.fmt.parseUnsigned(u32, data[index_of_comma + 1 .. index_of_bracket], 10) catch {
            std.debug.print("bad second num :{s}\n", .{data[index_of_comma + 1 .. index_of_bracket]});
            continue;
        };

        const mult = first_num * second_num;
        result += mult;

        // std.debug.print("{any}\n", .{mult});
    }

    std.debug.print("{}\n", .{result}); //168539636

}
