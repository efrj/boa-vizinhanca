FROM debian:bookworm-slim AS builder

WORKDIR /build

RUN apt-get update && apt-get install -y gcc g++ make git \
    && git clone --depth 1 https://github.com/vszakats/harbour-core.git /tmp/harbour \
    && cd /tmp/harbour && make -j4 > /dev/null 2>&1

COPY server.prg .

RUN /tmp/harbour/bin/linux/gcc/hbmk2 -gtcgi server.prg -o/build/server

FROM debian:bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y socat \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /build/server /app/server
COPY server.sh /app/server.sh
COPY response.sh /app/response.sh

RUN chmod +x /app/server /app/server.sh /app/response.sh

EXPOSE 8000

CMD ["/app/server.sh"]
