import * as servicesService from '../services/services.service.js';

export async function getServices(req, res){
    try{
        
        const { category, available, page, limit, sortBy, order } = req.query;
        const filters = {};

        if (category) filters.category = category;
        if (available !== undefined) filters.available = available;
        
        const options = {};
        if (page) options.page = page;
        if (limit) options.limit = limit;
        if (sortBy) options.sortBy = sortBy;
        if (order) options.order = order;

        const payload = await servicesService.getServices(filters, options);

        res.status(200).json({
            status:'Success',
            payload
        });

    }catch(error){
        return res.status(500).json({
            status:'Error',
            message:'Error to get a services'
        })
    };
};

export async function getServiceById(req, res) {
    try{
        const { sid } = req.params; 
        const serviceFound = await servicesService.getServiceById(sid);

        if (serviceFound.error){
            return res.status(404).json({
                status:'Error',
                message: serviceFound.error
            })
        }; 

        res.status(200).json({
            status:'Success',
            payload: serviceFound
        });
    }catch(error){
        return res.status(500).json({
            status:'Error',
            message:'Error to get a service'
        })
    };
};

export async function createService(req, res) {
    try{
        const newService = await servicesService.createService(req.body);

        if (newService.error){
            return res.status(400).json({
                status:'Error',
                message: newService.error
            });
        }

        const io = req.app.get('io');
        if (io) {
          io.emit('serviceCreated', newService);
        }

        res.status(201).json({
            status:'Success',
            payload:newService
        });

    }catch(error){
        return res.status(500).json({
            status:'Error',
            message:'Error to create a service'
        })
    };
};

export async function updateService(req, res) {
    try{
        const { sid } = req.params; 
        const updated = await servicesService.updateService(sid, req.body);  

        if (updated.error){
            return res.status(404).json({
                status: 'Error',
                message: updated.error
            })
        };

        return res.status(200).json({
            status: 'Success',
            payload: updated
        });
    }catch(error){
        return res.status(500).json({
            status:'Error',
            message:'Error to update a service'
        })
    };
};

export async function deleteService(req, res) {
    try{
        const { sid } = req.params; 
        const deleted = await servicesService.deleteService(sid);
        
        if (deleted.error){
            return res.status(404).json({
                status: 'Error',
                message: deleted.error
            })
        };
        
        const io = req.app.get('io');
        if (io) {
        io.emit('serviceDeleted', sid);
        }

        return res.status(200).json({
            status: 'Success',
            message: `Service with id: ${sid} successfully deleted`
        });

    }catch(error){
        return res.status(500).json({
            status:'Error',
            message:'Error to delete a service'
        })
    };
};