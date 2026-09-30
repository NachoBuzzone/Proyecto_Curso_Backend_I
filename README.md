# Pre-entrega 5 - Layered Architecture, DAO & Repository Refactor

The main goal of this release is to refactor the existing codebase into a  Layered Architecture (Routes → Controllers → Services → Repositories → DAOs) to decouple business logic from FileSystem persistence, preparing the system for seamless database migrations (such as MongoDB Atlas) without affecting external endpoint behavior.

## Running the Server

### Production / Standard start:

1. Create a local `.env` file based on `.env.example`.
2. Install dependencies by running ```npm install```.
3. Run the project with ```npm start```.

### Development mode (with auto-reload):

1. Run with ```npm run dev```.

## Layer Responsibilities
- **Routes (`src/routes/`):** Define API endpoints and HTTP verbs, delegating execution directly to controllers without handling business logic.
- **Controllers (`src/controllers/`):** Manage HTTP requests and responses. Extract inputs (`req.params`, `req.query`, `req.body`), invoke the corresponding service functions, and return standardized JSON responses (`200`, `201`, `400`, `404`, `500`).
- **Services (`src/services/`):** Encapsulate all core business rules and data validations (e.g., verifying entity existence, auto-incrementing IDs, checking required fields, and updating service quantities). Services are completely agnostic of Express (`req`/`res`).
- **Repositories (`src/repositories/`):** Provide an abstraction layer over data access, exposing domain-level methods without containing business rules.
- **DAOs (`src/dao/`):** Handle raw input/output operations directly against the persistent storage (`data/services.json` and `data/bookings.json`) using `node:fs/promises`.

## Explanation of the functions of the Controller Bookings
1. getAllBookings. Retrieves all bookings via bookingsService.
2. getBookingById. Retrieves a specific booking by ID.
3. createBooking. Handles booking creation requests.
4. addServiceToBooking. Adds a service to an existing booking or increments its quantity.

## Explanation of the functions of the Controller Services
1. getServices. Retrieves services and forwards optional query filters.
2. getServiceById.  Retrieves a specific service by ID.
3. createService.  Validates input and creates a new service.
4. updateService.  Updates a service without modifying its ID.
5. deleteService. Removes a service by its ID.

## Environment variables

1. PORT --> port on which the server is running.
2. NODE_ENV --> Environment: development | test | production.

## Endpoints

1. GET /api/services .Is used to access all services. Supports optional query parameters for filtering (category or available).
2. GET /api/services/:sid .Is used to get the service with a specific ID.
3. POST /api/services .Is used to add a service.
4. PUT /api/services/:sid .Is used to update a service.
5. DELETE /api/services/:sid .Is used to delete a service.
6. GET /api/bookings .Is used to get all bookings.
7. GET /api/bookings/:bid .Is used to get the booking with a specific ID.
8. POST /api/bookings .Is used to create a booking. Supports to create a booking with services empty.
9. POST /api/bookings/:bid/services/:sid  .Is used to add a service to an existing booking, verifying that both exist.

## Architectural Notes
- **bookings.service.js:** Enforces business logic. Validates that both the booking and service exist (querying services.repository.js) and increments the service quantity if it is already present in the booking.
- **services.service.js:** Enforces numeric validation for price and duration, auto-generates IDs, and applies filtering (category, available).
- **Repositories & DAOs:** Handle persistent operations on bookings.json and services.json (getAll, getById, create, update, delete).

## Example to create a booking

POST http://localhost:8080/api/bookings

Request body:
```json
{
  "clientName": "Martin",
  "clientEmail": "Martin@gmail.com",
  "date": "10-10-2026",
  "time": "20 minutos",
  "status": "pending",
  "services": [
    {
      "service": 1,
      "quantity": 1
    }
  ]
}