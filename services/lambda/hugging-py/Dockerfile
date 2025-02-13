# Use a lightweight Python image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install system dependencies required for transformers
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements first for caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Download and save the model inside the container
RUN python -c "from transformers import MarianMTModel, MarianTokenizer; \
    model_name='Helsinki-NLP/opus-mt-en-ROMANCE'; \
    MarianMTModel.from_pretrained(model_name).save_pretrained('/models'); \
    MarianTokenizer.from_pretrained(model_name).save_pretrained('/models')"

# Copy the rest of the application files
COPY . .

# Expose port 8000
EXPOSE 8000

# Set environment variable for model path
ENV MODEL_DIR=/models

# Run the application on port 8000
CMD ["python", "app.py"]
