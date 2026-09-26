FROM haskell:9.6 AS builder

WORKDIR /app

# Fix for aarch64 (Apple Silicon): GCC requires armv8.2-a+crypto+sha3 flags
# for crypton's ARM NEON intrinsics (vbcaxq_u64, vxarq_u64, eor3) to compile
RUN if [ "$(uname -m)" = "aarch64" ]; then \
        mv /usr/bin/gcc /usr/bin/gcc.real && \
        printf '#!/bin/sh\nexec /usr/bin/gcc.real "$@" -march=armv8.2-a+crypto+sha3\n' > /usr/bin/gcc && \
        chmod +x /usr/bin/gcc && \
        mv /usr/bin/as /usr/bin/as.real && \
        printf '#!/bin/sh\nexec /usr/bin/as.real "$@" -march=armv8.2-a+crypto+sha3\n' > /usr/bin/as && \
        chmod +x /usr/bin/as; \
    fi

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
