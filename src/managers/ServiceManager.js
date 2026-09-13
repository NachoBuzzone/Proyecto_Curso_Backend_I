import fs from 'node:fs/promises';

export class ServiceManager{
    constructor(filePath){
        this.path = filePath;
    };

    //Devuelve todos los servicios.
    async getServices(){
        try{
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        }catch(error){
            if (error.code === 'ENOENT' || error instanceof SyntaxError) {
                return [];
            };
            throw error;
        };
    };

    //Devuelve el servicio o null/mensaje de error.
    async getServiceById(id) {
        const data = await this.getServices();
        const service = data.find(servicio => servicio.id === Number(id));
        if (!service) {
            return {error: 'Service not found.'};
        };
        return service;
    };

    //Agrega un servicio; El id se genera automáticamente (no se recibe como parámetro); Valida que estén presentes: name, description, duration, price, category, available; rechaza servicios incompletos
    async addService(serviceData){

        const { name, description, duration, price, category, available } = serviceData;

        if ( !name || !description || duration === undefined || price === undefined || !category || available === undefined ){
            return {error: "The service you want to add is incomplete."}
        };

        const numericDuration = Number(duration);
        const numericPrice = Number(price);

        if ( !Number.isFinite(numericDuration) || !Number.isFinite(numericPrice) ){
            return {error: "Duration and price must be valid numbers."}
        };
        
        const data = await this.getServices()
        const newID = data.length > 0 ? data[data.length - 1].id + 1 : 1
        const newService = {
            "id": newID,
            "name": name,
            "description":description,
            "duration": numericDuration,
            "price": numericPrice,
            "category": category,
            "available": available
        };
        
        data.push(newService);
        await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
        return newService;
    };

    //Actualiza el servicio; No permite modificar el id; Devuelve null/error si no existe
    async updateService(id, updatedData){
        const data = await this.getServices();
        const serviceToUpdate = data.find(servicio => servicio.id === Number(id));
        if (!serviceToUpdate){
            return {error: 'Service not found.'}
        }
        Object.assign(serviceToUpdate,updatedData);
        serviceToUpdate.id = Number(id);
        await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
        return serviceToUpdate;
    };

    //Elimina el servicio; Devuelve null/error si no existe
    async deleteService(id){
        const data = await this.getServices();
        const restOfServices = data.filter(servicio => servicio.id != id);
        if (data.length == restOfServices.length){
            return { error: 'Service not found.'}
        }
        await fs.writeFile(this.path, JSON.stringify(restOfServices, null, 2), 'utf-8');
        return { message: `Service with id: ${id} successfully deleted` };
    };
}