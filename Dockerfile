#
# Build stage
#
FROM maven:3.9.0-eclipse-temurin-19-alpine AS build
COPY . .
RUN mvn clean package -Pprod -DskipTests

#
# Package stage
#
FROM eclipse-temurin:19-jdk-alpine
COPY --from=build /target/schafkopfturnierserver-0.0.1-SNAPSHOT.jar schafkopfturnierserver-0.0.1-SNAPSHOT.jar
ENV spring_active_profiles=prod
EXPOSE 8080
ENTRYPOINT ["java","-jar","schafkopfturnierserver-0.0.1-SNAPSHOT.jar"]
