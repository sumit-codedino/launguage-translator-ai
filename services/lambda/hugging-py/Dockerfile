# Use AWS Lambda base image for Python 3.9
FROM public.ecr.aws/lambda/python:3.9

# Set working directory (AWS Lambda uses /var/task)
WORKDIR /var/task

# Copy dependency file
COPY requirements.txt .

# Install dependencies with caching optimization
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY lambda_function.py .

# Uncomment if you need to preload a model (otherwise, handle it in lambda_function.py)
# ENV MODEL_DIR=/models
# RUN --mount=type=cache,target=/root/.cache/huggingface \
#     mkdir -p $MODEL_DIR && \
#     python -c "from transformers import MarianMTModel, MarianTokenizer; \
#                model_name = 'Helsinki-NLP/opus-mt-en-ROMANCE'; \
#                MarianMTModel.from_pretrained(model_name).save_pretrained('$MODEL_DIR'); \
#                MarianTokenizer.from_pretrained(model_name).save_pretrained('$MODEL_DIR')"

# Set the entry point for AWS Lambda
ENTRYPOINT ["python", "-m", "awslambdaric"]
CMD ["lambda_function.lambda_handler"]
