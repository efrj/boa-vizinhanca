FROM openjdk:latest

COPY Main.java .

ADD https://repo1.maven.org/maven2/com/googlecode/json-simple/json-simple/1.1.1/json-simple-1.1.1.jar .

RUN javac -cp .:json-simple-1.1.1.jar Main.java

CMD ["java", "-cp", ".:json-simple-1.1.1.jar", "Main"]
