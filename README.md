# Pre-entrega 2.

The goal of this installment is to build a REST API using Express that exposes endpoints for managing the “services” resource, connecting the routes to the ServiceManager from the previous installment.

# To run it.

1. Create a local `.env` file based on `.env.example`.
2. Install dependencies by running ```npm install```.
3. Run the project with ```npm start```.

# To start the server.

1. Run with ```npm run dev```

# Explanation of the methods of the Service Manager class.

1. getServices. Gets all the services.
2. getServiceById. Get the service with a specific ID.
3. addService. Add a service.
4. updateService. Update a service.
5. deleteService. Delete a service.

# Environment variables.

1. PORT --> port on which the server is running
2. NODE_ENV --> Enviroment: development | test | production

# Endpoints.

1. GET /api/services .Is used to access all services. Supports optional query parameters for filtering (category or available)
2. GET /api/services/:sid .Is used to get the service with a specific ID.
3. POST /api/services .Is used to add a service.
4. PUT /api/services/:sid .Is used to update a service.
5. DELETE /api/services/:sid .Is used to delete a service
