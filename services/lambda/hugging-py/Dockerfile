# Use AWS Lambda base image for Python 3.10 (recommended)
FROM public.ecr.aws/lambda/python:3.10

# Copy dependency file
COPY requirements.txt .

# Install dependencies with caching optimization
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --no-cache-dir -r requirements.txt

# Set environment variable for the model directory
ENV TRANSFORMERS_CACHE=/tmp/.cache
ENV S3_BUCKET=codedino.io
ENV MODEL_PATH=models/marianmt-model

# Copy application files
COPY app.py ${LAMBDA_TASK_ROOT}

# Set the Lambda function handler
CMD [ "app.handler" ]
