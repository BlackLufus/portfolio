FROM python:alpine

# Set the working directory
WORKDIR /api

# Creates a directory to store the data
RUN mkdir static

# Add ssl cert to nginx
COPY api.py .
COPY database.py .
COPY requirements.txt .
COPY static/ ./static

# Downloads requirements for the server
RUN pip install -r requirements.txt
RUN pip install flask_cors
RUN pip install Flask[async]
RUN pip install wheel
RUN pip install gunicorn

# Runs the login server
# CMD ["python", "api.py"]
CMD ["gunicorn", "-b", "0.0.0.0:7750", "api:api"]

# Hört auf den Port 7500
EXPOSE 7750