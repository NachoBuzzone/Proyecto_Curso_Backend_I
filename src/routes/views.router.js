import express from 'express'
import * as controllerViews from '../controllers/views.controller.js';

export const viewsRouter = express.Router();

viewsRouter.get('/services', controllerViews.renderServices);
viewsRouter.get('/bookings', controllerViews.renderBookings);

