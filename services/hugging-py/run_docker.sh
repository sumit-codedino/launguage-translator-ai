#!/bin/bash

# Set variables
IMAGE_NAME="flask-translation-app"
CONTAINER_NAME="translation_service"
PORT=8080

# Stop and remove any existing container with the same name
if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}\$"; then
    echo "Stopping and removing existing container: $CONTAINER_NAME"
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Build the Docker image
echo "Building Docker image: $IMAGE_NAME"
docker build -t $IMAGE_NAME .

# Run the Docker container
echo "Running Docker container: $CONTAINER_NAME"
docker run -d -p $PORT:5000 --name $CONTAINER_NAME $IMAGE_NAME

# Wait for a few seconds to ensure the container starts properly
sleep 5

# Test the API with a sample request
echo "Testing API..."
curl -X POST "http://localhost:$PORT/translate" \
     -H "Content-Type: application/json" \
     -d '{"text": "Hello", "target_language": "French"}'

echo -e "\nContainer is running on http://localhost:$PORT"