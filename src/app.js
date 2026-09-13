import { ServiceManager } from './managers/ServiceManager.js';
import { servicesRouter } from './routes/services.routes.js';
import { BookingManager } from './managers/BookingManager.js';
import { bookingsRouter } from './routes/bookings.routes.js';

import express from 'express';
export const app = express();

app.use(express.json());
app.use('/api/bookings', bookingsRouter);
app.use('/api/services', servicesRouter);