import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname,'../data/services.json');

export async function getAll(){
    try{
        const data = await fs.readFile(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    }catch(error){
        if (error.code === 'ENOENT' || error instanceof SyntaxError) {
            return [];
        };
        throw error;
    };
};

export async function getById(id){
    const services = await getAll();
    const service = services.find(service => service.id === Number(id));
    return service || null;
};

export async function create(data){
    const services = await getAll();
    services.push(data);
    await fs.writeFile(FILE_PATH, JSON.stringify(services, null, 2), 'utf-8');
    return data;
};

export async function update(id, data) {
    const services = await getAll();
    const serviceToUpdate = services.find(service => service.id === Number(id)); 
    if (!serviceToUpdate) {
        return null;
    }
    Object.assign(serviceToUpdate, data);
    serviceToUpdate.id = Number(id);
    await fs.writeFile(FILE_PATH, JSON.stringify(services, null, 2), 'utf-8');
    return serviceToUpdate;
}

export async function remove(id){
    const services = await getAll();
    const serviceToDelete = services.find(service => service.id === Number(id));
    if (!serviceToDelete) {
        return null;
    };
    const restOfServices = services.filter(service => service.id !== Number(id));
    await fs.writeFile(FILE_PATH, JSON.stringify(restOfServices, null, 2), 'utf-8');
    return serviceToDelete;
};