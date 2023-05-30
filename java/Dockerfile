FROM openjdk:11
COPY . /app
WORKDIR /app
RUN apt-get update && \
    apt-get install -y maven && \
    mvn clean package
CMD ["java", "-jar", "target/frases.jar"]
