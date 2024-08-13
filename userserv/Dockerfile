FROM openjdk:17 AS builder

RUN microdnf install findutils

WORKDIR /usr/src/svc
COPY . .

RUN ./gradlew clean bootJar


FROM openjdk:17

COPY --from=builder /usr/src/svc/build/libs/userserv.jar /app/userserv.jar

WORKDIR /app

CMD ["java","-jar","/app/userserv.jar"]