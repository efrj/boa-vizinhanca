FROM golang:latest

COPY main.go /app/
COPY go.mod /app/
WORKDIR /app

RUN go build -o main

CMD ["/app/main"]
