import express from 'express'
import { ControllerServices } from '../controllers/services.controller.js';

export const servicesRouter = express.Router();
export const controllerServices = new ControllerServices();

servicesRouter.get('/', controllerServices.getAllServices);
servicesRouter.get('/:sid', controllerServices.getService);
servicesRouter.post('/', controllerServices.createService);
servicesRouter.put('/:sid', controllerServices.updateService);
servicesRouter.delete('/:sid', controllerServices.removeService);
