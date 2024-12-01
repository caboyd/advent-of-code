const std = @import("std");
const split = std.mem.splitSequence;

pub fn main() !void {
    const data = @embedFile("./resources/input.txt");
    var splits = split(u8, data, "\n");

    var result: u32 = 0;

    while (splits.next()) |line| {
         std.debug.print("{s}\n", .{line});
         result = 1;
    }

    std.debug.print("{}\n", .{result}); //0
}
