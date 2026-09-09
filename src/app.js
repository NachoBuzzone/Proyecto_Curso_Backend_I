import { ServiceManager } from './managers/ServiceManager.js';
import express from 'express';
import { servicesRouter } from './routes/services.routes.js';
import { BookingManager } from './managers/BookingManager.js';

export const app = express();
app.use(express.json());
app.use('/api', servicesRouter);

const serviceManager = new ServiceManager('./src/data/services.json');
const bookingManager = new BookingManager('./src/data/bookings.json')
