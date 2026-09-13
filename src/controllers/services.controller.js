import { ServiceManager } from '../managers/ServiceManager.js';
const serviceManager = new ServiceManager('./src/data/services.json');

export class ControllerServices{
  
    getAllServices = async (req, res) => {
        try{
            const { category, available } = req.query;
            const services = await serviceManager.getServices();
            let filteredServices = services;

            if(category){
                filteredServices = filteredServices.filter((service)=> service.category === category)
            };

            if(available !== undefined){
                const availableBool = available === 'true';
                filteredServices = filteredServices.filter((service)=> service.available === availableBool)
            };

            res.status(200).json({
                status:'Success',
                payload: filteredServices
            });

        }catch(error){
            return res.status(500).json({
                status:'Error',
                payload:'Error to get a services'
            })
        };
    };

    getService = async (req, res) => {
        try{
            const { sid } = req.params; 
            const serviceFound = await serviceManager.getServiceById(sid);

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


    createService = async (req, res) => {
        try{
            const newService = await serviceManager.addService(req.body);

            if (newService.error){
                return res.status(400).json({
                    status:'Error',
                    payload:newService.error
                });
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


    updateService = async (req, res) => {
        try{
            const { sid } = req.params; 
            const updated = await serviceManager.updateService(sid, req.body);  

            if (updated.error){
                return res.status(404).json({
                    status: 'Error.',
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

    removeService = async (req, res) => {
        try{
            const { sid } = req.params; 
            const deleted = await serviceManager.deleteService(sid);
            
            if (deleted.error){
                return res.status(404).json({
                    status: 'Error.',
                    message: deleted.error
                })
            };

            return res.status(200).json({
                status: 'Success',
                message: `Service with id: ${id} successfully deleted`
            });

        }catch(error){
            return res.status(500).json({
                status:'Error',
                message:'Error to delete a service'
            })
        };
    };
};