FROM swift:latest

WORKDIR /app

RUN apt-get update && \
    apt-get install -y libssl-dev zlib1g-dev && \
    rm -rf /var/lib/apt/lists/*

COPY . .

RUN swift package resolve
RUN swift build -c release --package-path ./Sources/swift-http-server

CMD [".build/release/swift-http-server"]
