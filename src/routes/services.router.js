import express from 'express'
import * as controllerServices from '../controllers/services.controller.js';
import { validateBody } from '../middlewares/validateBody.js'
import { createServiceSchema, updateServiceSchema } from '../validations/service.validations.js'

export const servicesRouter = express.Router();

servicesRouter.get('/', controllerServices.getServices);
servicesRouter.get('/:sid', controllerServices.getServiceById);
servicesRouter.post("/", validateBody(createServiceSchema), controllerServices.createService)
servicesRouter.put('/:sid', validateBody(updateServiceSchema), controllerServices.updateService);
servicesRouter.delete('/:sid', controllerServices.deleteService);
