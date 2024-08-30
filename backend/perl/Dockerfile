FROM perl:latest

WORKDIR /app
COPY . .

RUN cpanm IO::Socket::INET JSON::XS

CMD [ "perl", "script.pl" ]
