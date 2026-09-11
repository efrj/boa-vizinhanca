FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

ADD https://github.com/scala/scala3/releases/download/3.3.3/scala3-3.3.3.tar.gz /opt/scala3.tar.gz
RUN tar -xzf /opt/scala3.tar.gz -C /opt && rm /opt/scala3.tar.gz

ENV PATH="/opt/scala3-3.3.3/bin:${PATH}"

ADD https://repo1.maven.org/maven2/com/googlecode/json-simple/json-simple/1.1.1/json-simple-1.1.1.jar /app/json-simple-1.1.1.jar

COPY Main.scala .

RUN scalac -classpath .:json-simple-1.1.1.jar Main.scala

EXPOSE 8000

CMD ["scala", "-classpath", ".:json-simple-1.1.1.jar", "Main"]
