import express from 'express'
import * as controllerServices from '../controllers/services.controller.js';

export const servicesRouter = express.Router();

servicesRouter.get('/', controllerServices.getServices);
servicesRouter.get('/:sid', controllerServices.getServiceById);
servicesRouter.post('/', controllerServices.createService);
servicesRouter.put('/:sid', controllerServices.updateService);
servicesRouter.delete('/:sid', controllerServices.deleteService);
