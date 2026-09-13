# Pre-entrega 4.

The goal of this release is to reorganize the existing API by separating responsibilities into three layers: routes, controllers, and managers. No new endpoints are being added.

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

# Explanation of the methods of the Booking Manager class.

1. getBookings. Gets all the bookings.
2. getBookingById. Get the booking with a specific ID.
3. createBooking. Create a booking.
4. addServiceToBooking. Add a service to booking.

# Explanation of the methods of the Controller Bookings class.
1. getAllBookings. Use the Bookings Manager feature to view all bookings.
2. getBooking. Use the Bookings Manager feature to retrieve a specific booking.
3. createBooking. Use the Bookings Manager feature to create a booking. 
4. addServiceToAnExistingBooking. Use the Bookings Manager feature to add a service to a booking.

# Explanation of the methods of the Controller Services class.
1. getAllServices. Use the Service Manager feature to view all services.
2. getService.  Use the Service Manager feature to request a specific service.
3. createService.  Use the Service Manager feature to create a Service. 
4. updateService.  Use the Service Manager feature to update a Service. 
5. removeService. Use the Service Manager feature to delete a Service. 

# Environment variables.

1. PORT --> port on which the server is running
2. NODE_ENV --> Enviroment: development | test | production

# Endpoints.

1. GET /api/services .Is used to access all services. Supports optional query parameters for filtering (category or available)
2. GET /api/services/:sid .Is used to get the service with a specific ID.
3. POST /api/services .Is used to add a service.
4. PUT /api/services/:sid .Is used to update a service.
5. DELETE /api/services/:sid .Is used to delete a service.
6. GET /api/bookings .Is used to get all bookings.
7. GET /api/bookings/:bid .Is used to get the booking with a specific ID.
8. POST	/api/bookings .Is used to create a booking. Supports to create a booking with services empty.
9. POST /api/bookings/:bid/services/:sid  .Is used to add a service to booking exists, verifying that both exist.


# Example to create a booking.

```
import { BookingManager } from './src/managers/BookingManager.js';
const bookingManager = new BookingManager('./src/data/bookings.json');


await bookingManager.createBooking({
    clientName: 'Martin',
    clientEmail: 'Martin@gmail.com',
    date: '10-10-2026',
    time: '20 minutos',
    status: 'pending',
    services: [{ service: 1, quantity: 1 }]
  });

  const bookings = await bookingManager.getBookings();
  console.log(bookings);
```