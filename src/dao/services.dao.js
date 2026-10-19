import Service from '../models/service.model.js'

export async function getAll(filters = {}, options = {}){
    try{
      const query = {};

      if (filters.category) {
        query.category = filters.category;
      }
      
      if (filters.available !== undefined) {
        query.available = filters.available === 'true' || filters.available === true;
      }
    
      const paginateOptions = {
        page: parseInt(options.page) || 1, 
        limit: parseInt(options.limit) || 10, 
        sort: {}
      };
    
      if (options.sortBy) {
        const sortField = options.sortBy;
        const sortDirection = options.order === 'desc' ? -1 : 1;
        paginateOptions.sort = { [sortField]: sortDirection };
      }

      const result = await Service.paginate(query, paginateOptions);
      
      return {
        docs: result.docs, 
        totalDocs: result.totalDocs, 
        limit: result.limit, 
        totalPages: result.totalPages,
        page: result.page,
        pagingCounter: result.pagingCounter, 
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage, 
        prevPage: result.prevPage,
        nextPage: result.nextPage
      };
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