FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    g++ \
    cmake \
    libjsoncpp-dev \
    nlohmann-json3-dev \
    wget \
    git

RUN git clone https://github.com/yhirose/cpp-httplib.git /cpp-httplib

WORKDIR /app

COPY random_phrase.cpp .

RUN g++ -o random_phrase random_phrase.cpp -I/cpp-httplib -ljsoncpp

EXPOSE 8080

CMD ["./random_phrase"]
