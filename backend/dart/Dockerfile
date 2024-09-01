FROM dart:latest

WORKDIR /app

COPY . .

RUN dart pub get

EXPOSE 3000

CMD ["dart", "app.dart"]
