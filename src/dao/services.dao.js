import Service from "../models/service.model.js"

export async function getAll(){
    try{
        const services = await Service.find().lean();
        return services;
    } catch (error) {
        console.error('Error al obtener servicios de MongoDB:', error);
        throw error;
  }
};

export async function getById(id){
    try {
        const service = await Service.findById(id).lean();
        return service || null;
    } catch (error) {
        console.error('Error al buscar servicio por ID en MongoDB:', error);
        throw error;
    };
}

export async function create(data){
  try {
        const newService = await Service.create(data);
        return newService.toObject();
  } catch (error) {
        console.error('Error al crear servicio en MongoDB:', error);
        throw error;
  }
};

export async function update(id, data) {
  try {
    const updatedService = await Service.findByIdAndUpdate(id, data, { new: true }).lean();

    return updatedService || null;
  } catch (error) {
    console.error('Error al actualizar servicio en MongoDB:', error);
    throw error;
  }
}

export async function remove(id){
  try {
    const deletedService = await Service.findByIdAndDelete(id).lean();
    return deletedService !== null;
  } catch (error) {
    console.error('Error al eliminar servicio de MongoDB:', error);
    throw error;
  }
};