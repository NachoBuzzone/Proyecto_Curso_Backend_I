import * as servicesRepositories from '../repositories/services.repositories.js';

export async function getServices(filters = {}, options = {}) {
    return await servicesRepositories.getAll(filters, options);
};

export async function getServiceById(id) {
    const service = await servicesRepositories.getById(id);
    if (!service){
        return { error: 'Service not found.' };
    };
    return service;
};

export async function createService(serviceData) {
    return await servicesRepositories.create(serviceData);
};

export async function updateService(id, updatedData) {
    const dataToUpdate = { ...updatedData };
    delete dataToUpdate.id;
    const updated = await servicesRepositories.update(id, dataToUpdate);
    if (!updated) {
        return { error: 'Service not found.' }; 
    }
    return updated;
};

export async function deleteService(id) {
    const deleted = await servicesRepositories.remove(id);
    if (!deleted) {
        return { error: 'Service not found.' };
    }
    return deleted;
};