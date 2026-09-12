FROM nimlang/nim:alpine AS builder

WORKDIR /app

COPY server.nim .

RUN nim c -d:release --opt:size -o:server server.nim

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/server /app/server

EXPOSE 8000

CMD ["/app/server"]
