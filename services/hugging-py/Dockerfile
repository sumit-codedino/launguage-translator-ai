# Use an official Python image
FROM python:3.11

# Set a writable working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the required port
EXPOSE 5000

# Set environment variables for Railway
ENV PORT 5000

# Run the Flask app
CMD ["python", "app.py"]