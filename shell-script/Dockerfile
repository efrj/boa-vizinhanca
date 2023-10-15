FROM debian:buster-slim

WORKDIR /usr/src/jaiminho

RUN apt-get update \
    && apt-get install -y netcat jq \
    && rm -rf /var/lib/apt/lists/*

COPY Jaiminho.sh .

RUN chmod +x Jaiminho.sh

CMD ["./Jaiminho.sh"]
