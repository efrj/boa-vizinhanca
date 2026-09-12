const std = @import("std");
const net = std.net;
const fs = std.fs;
const mem = std.mem;
const print = std.debug.print;

fn loadPhrases(allocator: mem.Allocator) ![][]const u8 {
    const file = try fs.cwd().openFile("phrases/phrases.json", .{});
    defer file.close();

    const content = try file.readToEndAlloc(allocator, 10 * 1024 * 1024);
    defer allocator.free(content);

    var parsed = try std.json.parseFromSlice(std.json.Value, allocator, content, .{});
    defer parsed.deinit();

    if (parsed.value.object.get("alma_negra")) |val| {
        var list = std.ArrayList([]const u8).init(allocator);
        for (val.array.items) |item| {
            const str = try allocator.dupe(u8, item.string);
            try list.append(str);
        }
        return list.toOwnedSlice();
    }
    return error.KeyNotFound;
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var prng = std.rand.DefaultPrng.init(@as(u64, @bitCast(std.time.milliTimestamp())));
    const random = prng.random();

    const phrases = loadPhrases(allocator) catch |err| {
        print("Error reading JSON file: {s}\n", .{@errorName(err)});
        return err;
    };
    defer {
        for (phrases) |p| allocator.free(p);
        allocator.free(phrases);
    }

    const address = try net.Address.parseIp4("0.0.0.0", 8000);
    var server = try address.listen(.{ .reuse_address = true });
    defer server.deinit();

    print("Server running at http://0.0.0.0:8000/\n", .{});

    while (true) {
        var connection = server.accept() catch |err| {
            print("Accept error: {s}\n", .{@errorName(err)});
            continue;
        };
        defer connection.stream.close();

        var buf: [1024]u8 = undefined;
        _ = connection.stream.read(&buf) catch continue;

        const phrase = if (phrases.len > 0)
            phrases[random.uintLessThan(usize, phrases.len)]
        else
            "Error reading Alma Negra phrases.";

        var response_buf: [4096]u8 = undefined;
        const response = std.fmt.bufPrint(
            &response_buf,
            "HTTP/1.1 200 OK\r\n" ++
                "Content-Type: text/html; charset=utf-8\r\n" ++
                "Access-Control-Allow-Origin: *\r\n" ++
                "Content-Length: {d}\r\n" ++
                "Connection: close\r\n" ++
                "\r\n" ++
                "{s}",
            .{ phrase.len, phrase },
        ) catch continue;

        _ = connection.stream.writeAll(response) catch continue;
    }
}
