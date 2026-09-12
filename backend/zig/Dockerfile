FROM alpine:latest AS builder

RUN apk add --no-cache curl xz tar

RUN ARCH=$(uname -m) && \
    curl -fsSL "https://ziglang.org/download/0.13.0/zig-linux-${ARCH}-0.13.0.tar.xz" | tar -xJ -C /usr/local && \
    ln -s /usr/local/zig-linux-${ARCH}-0.13.0/zig /usr/local/bin/zig

WORKDIR /app

COPY main.zig .

RUN zig build-exe -O ReleaseFast -fstrip main.zig -femit-bin=/app/server

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/server /app/server

EXPOSE 8000

CMD ["/app/server"]
