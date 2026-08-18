import {readFileSync,writeFileSync} from 'node:fs';

export class ServiceManager{
    constructor(filePath){
        this.path = filePath;
    }

    //Devuelve todos los servicios.
    getServices(){
        const data = readFileSync(this.path, 'utf-8');
        return JSON.parse(data);
    }

    //Devuelve el servicio o null/mensaje de error.
    getServiceById(id) {
        const data = this.getServices();
        const service = data.find(servicio => servicio.id == id);
        return service || null;
    }

    //Agrega un servicio; El id se genera automáticamente (no se recibe como parámetro); Valida que estén presentes: name, description, duration, price, category, available; rechaza servicios incompletos
    addService(serviceData){
        const data = this.getServices()
        const newID = data.length > 0 ? data[data.length - 1].id + 1 : 1
        const newService = {
            "id": newID,
            "name": serviceData.name,
            "description":serviceData.description,
            "duration": serviceData.duration,
            "price": serviceData.price,
            "category": serviceData.category,
            "available": serviceData.available
        }
        if ( !newService.name || !newService.description || !newService.duration || !newService.price || !newService.category || newService.available === undefined ){
            return "The service you want to add is incomplete."
        }

        data.push(newService);
        writeFileSync(this.path, JSON.stringify(data, null, 2), 'utf-8');
        return newService;
    }

    //Actualiza el servicio; No permite modificar el id; Devuelve null/error si no existe
    updateService(id, updatedData){
        const data = this.getServices();
        const serviceToUpdate = data.find(servicio => servicio.id == id);
        if (!serviceToUpdate){
            return {error: 'Service not found.'}
        }
        Object.assign(serviceToUpdate,updatedData);
        serviceToUpdate.id = Number(id);
        writeFileSync(this.path, JSON.stringify(data, null, 2), 'utf-8');
        return serviceToUpdate;
    }

    //Elimina el servicio; Devuelve null/error si no existe
    deleteService(id){
        const data = this.getServices();
        const restOfServices = data.filter(servicio => servicio.id != id);
        if (data.length == restOfServices.length){
            return { error: 'Service not found.'}
        }
        writeFileSync(this.path, JSON.stringify(restOfServices, null, 2), 'utf-8');
        return { message: `Servicio con id:${id} eliminado correctamente`};
    }

}