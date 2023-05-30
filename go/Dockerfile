FROM golang:1.17

WORKDIR /app

COPY go.mod go.sum /app/
RUN go mod download

COPY . /app

RUN go build -o main .

CMD ["./main"]
