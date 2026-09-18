FROM ghcr.io/gleam-lang/gleam:v1.14.0-erlang

WORKDIR /app

COPY gleam.toml ./
COPY src ./src

RUN gleam deps download
RUN gleam build

EXPOSE 8000

CMD ["gleam", "run"]
