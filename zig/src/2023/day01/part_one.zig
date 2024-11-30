const std = @import("std");
const split = std.mem.splitSequence;

pub fn main() !void {
    const data = @embedFile("./resources/input.txt");
    var splits = split(u8, data, "\n");

    var result: u32 = 0;

    while (splits.next()) |line| {
        // std.debug.print("{s}\n", .{line});
        var first: ?u8 = null;
        var last: ?u8 = null;
        for (line) |c| {
            if (c < '0' or c > '9') {
                continue;
            }
            const digit = c - '0';

            if (first == null) first = digit;
            last = digit;
        }
        result += 10 * first.? + last.?;
    }

    std.debug.print("{}\n", .{result}); //53651
}
