import { ServiceManager } from './managers/ServiceManager.js';

const serviceManager = new ServiceManager('./src/data/services.json');

console.log("ALL SERVICES:");
console.log(serviceManager.getServices());