FROM maven:3.8.3-openjdk-17 AS builder

WORKDIR /app

COPY target/EMS_communication-0.0.1-SNAPSHOT.jar /app/application.jar

EXPOSE 5050

CMD ["java", "-jar", "application.jar"]