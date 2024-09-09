FROM openjdk:17 AS builder

RUN microdnf install findutils

WORKDIR /usr/src/svc
COPY . .

RUN ./gradlew clean bootJar


FROM openjdk:17

COPY --from=builder /usr/src/svc/build/libs/gateway.jar /app/gateway.jar

WORKDIR /app

CMD ["java","-jar","/app/gateway.jar"]