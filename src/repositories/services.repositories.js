import * as servicesDao from '../dao/services.dao.js';

export async function getAll() {
    return servicesDao.getAll();
};

export async function getById(id) {
    return servicesDao.getById(id);
};

export async function create(serviceData) {
    return servicesDao.create(serviceData);
};

export async function update(id, updatedData) {
    return servicesDao.update(id, updatedData);
};

export async function remove(id) {
    return servicesDao.remove(id);
};