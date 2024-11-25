# URL Shortener

A simple URL shortener application built with Flask and Flask-RESTx. This application allows users to submit a long URL and receive a shortened version. The shortened URL can then redirect users back to the original URL.

## Features

### Core Features

- **URL Shortening**: Generate a unique short URL for a given long URL.
- **Redirection**: Redirect users to the original URL when accessing the short URL.

### Additional Features

- API documentation available at `/api/docs`.
  http://localhost:5001/api/docs/
- Database integration (PostgreSQL)
- Frontend Client with React.ts
- Docker containerization
- URL validation

## Design Architecture: Controller, Service, and DAL Layers

To structure the URL shortener application with a clear separation of concerns, we implement a Controller-Service-DAL (Data Access Layer) architecture. This design ensures scalability, maintainability, and testability.

## Endpoints

### 1. Shorten a URL

- **Endpoint**: `POST /api/shorten/`
- **Request Body**:
  ```json
  {
    "url": "https://example.com/very/long/url"
  }
  ```
- **Response:**
  ```json
  {
    "short_url": "http://localhost:5000/redirect/abc123",
    "short_code": "abc123"
  }
  ```

### 2. Redirect to Original URL

- **Endpoint:** GET /api/redirect/<short_code>
- **Response:**
  <b>Success:</b> Redirects (HTTP 302) to the original URL.
  <b>Error:</b> Returns 404 if the short code does not exist.

## Getting Started

### Prerequisites

Python 3.12
Flask and Flask-RESTx libraries

### Installation

### Server

<b> Clone the repository:</b>

1. git clone https://github.com/roy845/BonDataURLShortener/tree/main
2. cd server
3. <b>Install virtual environment:</b>
   python venv venv
4. <b>Activate virtual environment:</b>
   .\venv\Scripts\activate

5. <b>Install dependencies:</b>
   pip install -r requirements.txt

6. <b>Prepare .env file with the following fields:</b>

   DATABASE_TEST_URL=
   POSTGRES_PASSWORD=
   POSTGRES_DB=

7. <b>Run the application:</b>

   python app.py

8. <b>Access the API documentation at:</b>

   http://localhost:5001/api/docs

<b> OR </b>

while in the server directory type the command docker-compose up and it will spin the backend api and the database together

### Client

1.  <b>Return to the root directory and type:</b> cd client
2.  <b>Install dependencies:</b>
    npm install
3.  <b>Run the application:</b>
    npm start
