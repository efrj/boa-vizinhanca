FROM haskell:9.6 AS builder

WORKDIR /app

COPY tripa-seca.cabal .
RUN cabal update && cabal build --only-dependencies -j

COPY . .
RUN cabal build -j && cp $(cabal list-bin tripa-seca) /app/tripa-seca

FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends libgmp10 ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/tripa-seca /app/tripa-seca

EXPOSE 8000

CMD ["/app/tripa-seca"]
