#!/bin/bash

# Set variables
IMAGE_NAME="flask-translation-app"
CONTAINER_NAME="translation_service"
PORT=8080
USER_NAME=""

# Stop and remove any existing container with the same name
if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}\$"; then
    echo "Stopping and removing existing container: $CONTAINER_NAME"
    docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME
fi

# Build the Docker image
echo "Building Docker image: $IMAGE_NAME"
docker build --platform linux/amd64 -t $IMAGE_NAME . || { echo "Docker build failed"; exit 1; }

# Run the Docker container
echo "Running Docker container: $CONTAINER_NAME"
docker run -d -p $PORT:5000 --name $CONTAINER_NAME $IMAGE_NAME

# Wait for a few seconds to ensure the container starts properly
sleep 5

# Check if the container is running
if [ "$(docker inspect -f '{{.State.Running}}' $CONTAINER_NAME 2>/dev/null)" != "true" ]; then
    echo "Error: The container failed to start. Check logs using 'docker logs $CONTAINER_NAME'"
    exit 1
fi

# Test the API with a sample request
echo "Testing API..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "http://localhost:$PORT/translate" \
     -H "Content-Type: application/json" \
     -d '{"text": "Hello", "target_language": "French"}')

if [ "$RESPONSE" -eq 200 ]; then
    echo -e "\nAPI test successful! Container is running on http://localhost:$PORT"
else
    echo -e "\nAPI test failed with HTTP status: $RESPONSE. Check container logs: docker logs $CONTAINER_NAME"
fi

docker tag $IMAGE_NAME $USER_NAME/$IMAGE_NAME

echo "Pushing Docker image: $USER_NAME/$IMAGE_NAME"

docker push $USER_NAME/$IMAGE_NAME

echo "Docker image pushed successfully"