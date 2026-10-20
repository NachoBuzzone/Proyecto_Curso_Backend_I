import express from 'express';
import * as controllerBookings from '../controllers/bookings.controller.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createBookingSchema, updateBookingSchema } from '../validations/booking.validations.js';

export const bookingsRouter = express.Router();

bookingsRouter.get('/', controllerBookings.getAllBookings);
bookingsRouter.get('/:bid', controllerBookings.getBookingById);
bookingsRouter.post('/', validateBody(createBookingSchema), controllerBookings.createBooking);
bookingsRouter.post('/:bid/services/:sid', controllerBookings.addServiceToBooking);