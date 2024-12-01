const std = @import("std");
const split = std.mem.splitSequence;

pub fn main() !void {
    const data = @embedFile("./resources/input.txt");
    // const data =
    //     \\3   4
    //     \\4   3
    //     \\2   5
    //     \\1   3
    //     \\3   9
    //     \\3   3
    // ;
    var lines = split(u8, data, "\r\n");
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer if (gpa.deinit() != .ok)
        @panic("Memory leak has occurred!\n");
    const allocator = gpa.allocator();

    var result: i32 = 0;
    var arr = std.ArrayList(i32).init(allocator);
    var arr2 = std.ArrayList(i32).init(allocator);
    defer arr.deinit();
    defer arr2.deinit();

    while (lines.next()) |line| {
        var splits = std.mem.tokenizeAny(u8, line, "   ");

        const first = splits.next().?;
        const second = splits.next().?;
        var num = try std.fmt.parseUnsigned(i32, first, 10);
        try arr.append(num);
        num = try std.fmt.parseUnsigned(i32, second, 10);
        try arr2.append(num);
    }

    // const x = try arr.toOwnedSlice();
    // defer allocator.free(x);
    // std.mem.sort(i32, x, {}, comptime std.sort.asc(i32));
    // const x2 = try arr2.toOwnedSlice();
    // defer allocator.free(x2);
    // std.mem.sort(i32, x2, {}, comptime std.sort.asc(i32));

    for (0..arr.items.len) |i| {
        var mult:i32 = 0;
        for (0..arr2.items.len) |j| {
            if (arr.items[i] == arr2.items[j]) mult += 1;
        }
        result += arr.items[i] * mult;
    }

    std.debug.print("{}\n", .{result}); //2031679
}
