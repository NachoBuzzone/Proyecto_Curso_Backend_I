import { servicesRouter } from './routes/services.router.js';
import { bookingsRouter } from './routes/bookings.router.js';
import { viewsRouter } from './routes/views.router.js';
import { engine } from 'express-handlebars';
import path from 'path';

import express from 'express';
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/bookings', bookingsRouter);
app.use('/api/services', servicesRouter);
app.use('/views', viewsRouter);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve('./src/views'));

app.use(express.static(path.resolve('./src/public')));