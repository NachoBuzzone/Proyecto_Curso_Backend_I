import * as servicesRepositories from '../repositories/services.repositories.js';


export async function getServices(filters = {}) {
    const services = await servicesRepositories.getAll();
    const { category, available } = filters;
    let filteredServices = services

    if(category){
        filteredServices = filteredServices.filter((service)=> service.category === category)
    };

    if(available !== undefined){
        const availableBool = available === true || available === 'true';
        filteredServices = filteredServices.filter((service)=> service.available === availableBool)
    };

    return filteredServices;
}


export async function getServiceById(id) {
    const service = await servicesRepositories.getById(id);
    if (!service){
        return { error: 'Service not found.' };
    };
    return service;
};

export async function createService(serviceData){
    const { name, description, duration, price, category, available } = serviceData;

    if ( !name || !description || duration === undefined || price === undefined || !category || available === undefined ){
        return { error: 'The service you want to add is incomplete.' }
    };

    const numericDuration = Number(duration);
    const numericPrice = Number(price);

    if ( !Number.isFinite(numericDuration) || !Number.isFinite(numericPrice) ){
        return {error: 'Duration and price must be valid numbers.'}
    };

    const newService = {
        "name": name,
        "description":description,
        "duration": numericDuration,
       "price": numericPrice,
        "category": category,
        "available": available
    };
    return await servicesRepositories.create(newService);
};

export async function updateService(id, updatedData){
    const dataToUpdate = { ...updatedData };
    delete dataToUpdate.id;
    const updated = await servicesRepositories.update(id, dataToUpdate);
    if (!updated){
        return { error: 'Service not found.' }; 
    }
    return updated
};

export async function deleteService(id){
    const deleted = await servicesRepositories.remove(id);
    if (!deleted){
        return { error: 'Service not found.' };
    };
    return deleted;
};