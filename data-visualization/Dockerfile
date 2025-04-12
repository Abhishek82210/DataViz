# Use OpenJDK image
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/*.jar app.jar

# Expose port 8080 for the app
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
