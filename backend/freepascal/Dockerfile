FROM debian:bookworm-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    fpc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY server.pas .

RUN fpc -O2 server.pas -oserver

FROM debian:bookworm-slim

WORKDIR /app

COPY --from=builder /app/server /app/server

EXPOSE 8000

CMD ["/app/server"]
