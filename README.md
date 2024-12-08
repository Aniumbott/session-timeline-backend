# Backend Part of Full Stack Application (Session Timeline)

## Overview

This project is a RESTful API bakckend for managing sessions, participants and their events. It provides endpoints for creating new sessions, adding participants, and logging various events related to participants. The API is built using Node.js, Express, and MongoDB. The frontend application can be found [here](https://github.com/Aniumbott/session-timeline)

## Features

- **Start and End Sessions**: Create new sessions and terminate existing ones.
- **Participant Management**: Add participants to sessions and manage their data.
- **Event Logging**: Log various events related to participants such as microphone activity, webcam usage, screen sharing, and error reporting.
- **Pagination**: Efficiently retrieve sessions with pagination support.
- **Validation**: Robust data validation using Joi to ensure data integrity.
- **Logging**: Comprehensive logging with Winston for monitoring and debugging.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **Joi**: Data validation library.
- **Winston**: Logging library.
- **Morgan**: HTTP request logger middleware.
- **Helmet**: Security middleware.
- **Cors**: Middleware for enabling CORS.

## Installation

### 1. **Clone the Repository**

```bash
git clone https://github.com/aniumbott/session-timeline-backend.git
cd session-timeline-backend
```

### 2. Install Dependencies

Ensure you have Node.js and npm installed. Then, install the dependencies using npm:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
MONGODB_URI="your_mongodb_connection_string"
PORT=5000
NODE_ENV=development
```

### 4. Start the Server

```bash
npm start
```

The server will start on the specified port (default: 5000).

## API Endpoints

### 1. Start a New Session

- URL: `/api/v1/sessions/start`
- Method: `POST`
- Body Parameters:

```json
{
  "start": "2023-10-18T10:00:00Z"
}
```

- Responses:
  - `201` Created: Session started successfully.
  - `400` Bad Request: Invalid data.

### 2. Add Participant

- URL: `/api/v1/sessions/:sessionId/participants`
- Method: `POST`
- Body Parameters:

```json
{
  "participantId": "user123",
  "name": "John Doe",
  "events": {}
}
```

- Responses:
  - `200` OK: Participant added successfully.
  - `404` Not Found: Session not found.
  - `400` Bad Request: Invalid data.

### 3. End a Session

- URL: `/api/v1/sessions/:sessionId/end`
- Method: `POST`
- Responses:
  - `200` OK: Session ended successfully.
  - `404` Not Found: Session not found.
  - `400` Bad Request: Session has already ended.

### 4. Get All Sessions with Pagination

- URL: `/api/v1/sessions`
- Method: `GET`
- Query Parameters:
  - page: Page number (default: 1)
  - limit: Number of sessions per page (default: 10)
- Responses:
  - `200` OK: Returns paginated sessions.
  - `400` Bad Request: Invalid query parameters.

### 5. Get Session by ID

- URL: `/api/v1/sessions/:sessionId`
- Method: `GET`
- Responses:
  - `200` OK: Returns session details.
  - `404` Not Found: Session not found.

## Error Handling

The application uses a global error handler to manage errors gracefully. Errors are logged using Winston and appropriate HTTP status codes are returned to the client.

## Logging

- **Winston**: Handles logging of application events and errors.
- **Morgan**: Middleware for logging HTTP requests.
- Logs are stored in the logs/app.log file.
