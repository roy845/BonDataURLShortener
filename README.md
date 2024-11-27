# URL Shortener

A simple URL shortener application built with Flask and Flask-RESTx. This application allows users to submit a long URL and receive a shortened version. The shortened URL can then redirect users back to the original URL.

## Features

### Core Features

- **URL Shortening**: Generate a unique short URL for a given long URL.
- **Redirection**: Redirect users to the original URL when accessing the short URL.

### Additional Features

- Database integration (PostgreSQL)
- Frontend Client with React.ts
- Docker containerization
- URL validation
- Custom short URL slugs
- Usage analytics
- Rate limiting (10 requests per 1 minute to the shorten url endpoint (/api/shorten))
- API documentation available at `/api/docs`.
  http://localhost:5001/api/docs/

## Design Architecture: Controller, Service, and DAL Layers

To structure the URL shortener application with a clear separation of concerns, we implement a Controller-Service-DAL (Data Access Layer) architecture. This design ensures scalability, maintainability, and testability.

## Endpoints

### 1. Server Health

    Returns a JSON response indicating the health status of the server, including the current UTC timestamp.

- **Endpoint:** `GET /api/health`
- **Response:**
  <b>Success:</b> Server is healthy and running. (HTTP 200)

### 2. Shorten a URL

    Shortens a given long URL into a shorter version, with an optional custom slug.

- **Endpoint**: `POST /api/shorten/`
- **Request Body**:
  ```json
  {
    "url": "https://example.com/very/long/url"
  }
  ```
- **Response:**
  <b>Success:</b> 201 (HTTP_CREATED) URL successfully shortened
  ```json
  {
    "short_url": "http://localhost:5000/redirect/abc123",
    "short_code": "abc123"
  }
  ```
  <b>Error:</b>
  - Returns 400 (HTTP_BAD_REQUEST) Invalid URL or custom slug provided
  - Returns 500 (INTERNAL_SERVER_ERROR) An unexpected error occurred.

### 3. Redirect to Original URL

    Redirect to the original URL based on the provided short code.

- **Endpoint:** `GET /api/redirect/<short_code>`
- **Response:**
  <b>Success:</b> Redirects (HTTP_FOUND 302) to the original URL.
  <b>Error:</b>
  - Returns 404 (HTTP_NOT_FOUND) if the short code does not exist.
  - Returns 500 (INTERNAL_SERVER_ERROR) An unexpected error occurred.

### 4. Get All Short Codes List

    Fetches all short codes and original URLS.

- **Endpoint:** `GET /api/analytics/short-codes`
- **Response:**
  <b>Success:</b> List of all short codes and their original urls (HTTP_OK 200)
  <b>Error:</b> Returns 500 (INTERNAL_SERVER_ERROR) An unexpected error occurred.

### 5. Get Analytics Data per Short Code URL

    Fetches usage analytics for a specific short URL.

- **Endpoint:** `GET /api/analytics/<short_code>`
- **Response:**

  ```json
  {
    "original_url": "https://www.google.com/search?q=how+are+you+synonyms+slang&sca_esv=9752ad96db2cbf24&sxsrf=ADLYWIJkxX0227DWLaqaW-PrDOhpflqFkw%3A1732528437994&ei=NUlEZ5mxPJWukdUPyp_WgQ4&oq=How+are+you+synonyms&gs_lp=Egxnd3Mtd2l6LXNlcnAiFEhvdyBhcmUgeW91IHN5bm9ueW1zKgIIADIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzINEAAYgAQYsAMYQxiKBTINEAAYgAQYsAMYQxiKBUjQClAAWABwAngBkAEAmAEAoAEAqgEAuAEByAEAmAICoAIhmAMAiAYBkAYKkgcBMqAHAA&sclient=gws-wiz-serp",
    "short_code": "izuero",
    "access_count": 0,
    "last_accessed": null
  }
  ```

  <b>Error:</b>

  - Returns 404 (HTTP_NOT_FOUND) Short URL not found.
  - Returns 500 (INTERNAL_SERVER_ERROR) An unexpected error occurred.

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

6. <b>Prepare .env file with the following fields and put it in the server directory:</b>

   DATABASE_TEST_URL=
   POSTGRES_PASSWORD=
   POSTGRES_DB=

7. <b>Run the application:</b>

   python app.py

8. <b>Access the API documentation at:</b>

   http://localhost:5001/api/docs

<b> OR </b>

while in the server directory type the command docker-compose up and it will spin the backend api and the database together BUT make sure you did step 6.

### Client

1.  <b>Return to the root directory and type:</b> cd client
2.  <b>Install dependencies:</b>
    npm install
3.  <b>Run the application:</b>
    npm start
