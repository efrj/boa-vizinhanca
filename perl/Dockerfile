FROM perl:latest

WORKDIR /app
COPY . .

RUN cpanm IO::Socket::INET

CMD [ "perl", "script.pl" ]
