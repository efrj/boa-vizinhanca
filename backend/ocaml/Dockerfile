FROM ocaml/opam:debian-12-ocaml-5.1 AS builder

RUN sudo apt-get update && sudo apt-get install -y pkg-config libgmp-dev && \
    opam install -y tiny_httpd yojson dune

WORKDIR /home/opam/app

COPY --chown=opam:opam . .

RUN eval $(opam env) && dune build --profile release

FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /home/opam/app/_build/default/main.exe /app/quase-nada

EXPOSE 8000

CMD ["/app/quase-nada"]
