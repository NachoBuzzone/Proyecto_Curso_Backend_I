import { ServiceManager } from './managers/ServiceManager.js';
import express from 'express';
import { servicesRouter } from './routes/services.routes.js';

export const app = express();
app.use(express.json());
app.use('/api', servicesRouter);

const serviceManager = new ServiceManager('./src/data/services.json');

console.log("ALL SERVICES:");
console.log(serviceManager.getServices());