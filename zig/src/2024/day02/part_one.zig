const std = @import("std");
const split = std.mem.splitSequence;

pub fn main() !void {
    const data = @embedFile("./resources/input.txt");
    // const data =
    //     \\7 6 4 2 1
    //     \\1 2 7 8 9
    //     \\9 7 6 2 1
    //     \\1 3 2 4 5
    //     \\8 6 4 4 1
    //     \\1 3 6 7 9
    // ;
    var lines = split(u8, data, "\r\n");

    var result: i32 = 0;

    while (lines.next()) |line| {
        var tokens = std.mem.tokenizeAny(u8, line, " ");
        var safe = true;
        var inreasing = true;
        var decreasing = true;
        var previous_num: i32 = try std.fmt.parseInt(i32, tokens.next().?, 10);
        while (tokens.next()) |token| {
            const num = try std.fmt.parseInt(i32, token, 10);
            const diff: u32 = @abs(num - previous_num);
            if (diff > 3 or diff < 1) {
                safe = false;
                break;
            }
            if (num > previous_num) {
                decreasing = false;
            } else if (num < previous_num) {
                inreasing = false;
            }
            previous_num = num;
        }
        if(safe and (inreasing or decreasing)) result += 1;

        //std.debug.print("{s}\n", .{line});

    }

    std.debug.print("{}\n", .{result}); //442
}
