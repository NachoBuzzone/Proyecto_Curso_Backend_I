import express from 'express'
import { ServiceManager } from '../managers/ServiceManager.js';

export const servicesRouter = express.Router();

servicesRouter.use(express.json())
const serviceManager = new ServiceManager('./src/data/services.json');

servicesRouter.get('/services',(req, res) =>{

    const { category, available } = req.query;
    const allServices = serviceManager.getServices()
    let filteredServices = allServices;

    if(category){
        filteredServices = filteredServices.filter((service)=> service.category === category)
    };

    if(available !== undefined){
        const availableBool = available === 'true';
        filteredServices = filteredServices.filter((service)=> service.available === availableBool)
    };

    res.status(200).json({
        status: 'success.',
        payload: filteredServices
    })
});

servicesRouter.get('/services/:sid',(req, res) =>{

    const { sid } = req.params;
    const allServices = serviceManager.getServices();
    const foundService = allServices.find((service) => service.id === Number(sid));

    if (!foundService){
        return res.status(404).json({
            status: 'Error',
            message: 'Service not found'
        })
    }

    res.status(200).json({
        status: 'Success',
        payload: foundService
    })
});

//POST	/api/services	Crea un servicio con los datos del body. id generado automáticamente. 201 si se crea, 400 si faltan campos

servicesRouter.post('/services', (req, res)=>{

    const allServices = serviceManager.getServices();
    const { name, description, duration, price, category, available} = req.body;

    if(!name || !description || !duration || !price || !category){
        return res.status(400).json({
            status: 'Error',
            message: 'Required fields are missing'
        })
    };

    const newService = serviceManager.addService({
        name,
        description,
        duration,
        price,
        category,
        available: available ?? true
    });

    res.status(201).json({
        status: 'Success',
        payload: newService
    })
});


//PUT	/api/services/:sid	Actualiza el servicio. No permite modificar el id. 200 si existe, 404 si no

servicesRouter.put('/services/:sid', (req, res) =>{

    const allServices = serviceManager.getServices();
    const { sid } = req.params;
    const serviceIndex = allServices.findIndex((service) => service.id === Number(sid));

    if (serviceIndex === -1){
        return res.status(404).json({
            status: 'Error',
            message: 'Service not found'
        })
    }

    const updatedService = {
        ...allServices[serviceIndex],
        ...req.body,
        id: allServices[serviceIndex].id
    }

    serviceManager.updateService(sid,updatedService);
})

//DELETE	/api/services/:sid	Elimina el servicio. 200 si existe, 404 si no

servicesRouter.delete('/services/:sid', (req, res) => {

    const allServices = serviceManager.getServices();
    const { sid } = req.params;
    const foundService = allServices.find((service) => service.id === Number(sid));

    if (!foundService){
        return res.status(404).json({
            status: 'Error.',
            message: 'Service not found.'
        })
    }

    serviceManager.deleteService(Number(sid));

    res.status(200).json({
        status: 'Success',
        payload: foundService
    })

})
