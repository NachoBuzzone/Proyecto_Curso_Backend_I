import express from 'express'
import { ControllerBookings } from '../controllers/bookings.controller.js';

export const bookingsRouter = express.Router();
export const controllerBookings = new ControllerBookings();

bookingsRouter.get('/', controllerBookings.getAllBookings);
bookingsRouter.get('/:bid', controllerBookings.getBooking);
bookingsRouter.post('/', controllerBookings.createBooking);
bookingsRouter.post('/:bid/services/:sid', controllerBookings.addServiceToAnExistingBooking);