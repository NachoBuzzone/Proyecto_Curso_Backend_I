import express from 'express';
import * as controllerBookings from '../controllers/bookings.controller.js';

export const bookingsRouter = express.Router();

bookingsRouter.get('/', controllerBookings.getAllBookings);
bookingsRouter.get('/:bid', controllerBookings.getBookingById);
bookingsRouter.post('/', controllerBookings.createBooking);
bookingsRouter.post('/:bid/services/:sid', controllerBookings.addServiceToBooking);