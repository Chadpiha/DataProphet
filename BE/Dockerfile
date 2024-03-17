# Use Python base image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy the entire project directory into the container
COPY . .

# Install dependencies
RUN pip3 install -r requirements.txt

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
