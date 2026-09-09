import express from 'express'
import { ServiceManager } from '../managers/ServiceManager.js';

export const servicesRouter = express.Router();

servicesRouter.use(express.json())
const serviceManager = new ServiceManager('./src/data/services.json');

servicesRouter.get('/services', async (req, res) =>{

    const { category, available } = req.query;
    const allServices = await serviceManager.getServices()
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

servicesRouter.get('/services/:sid',async (req, res) =>{

    const { sid } = req.params;
    const foundService = await serviceManager.getServiceById(Number(sid))

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

servicesRouter.post('/services', async (req, res)=>{

    const { name, description, duration, price, category, available} = req.body;

    if(!name || !description || !duration || !price || !category){
        return res.status(400).json({
            status: 'Error',
            message: 'Required fields are missing'
        })
    };

    const newService = await serviceManager.addService({
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

servicesRouter.put('/services/:sid', async (req, res) =>{

    const { sid } = req.params;
    const foundService = await serviceManager.getServiceById(Number(sid))


    if (!foundService){
        return res.status(404).json({
            status: 'Error.',
            message: 'Service not found.'
        })
    }

    const updatedService = {
        ...foundService,
        ...req.body,
        id: foundService.id
    }

    await serviceManager.updateService(sid,updatedService);
    res.status(200).json({
        status: 'Success',
        payload: updatedService
    })
})

//DELETE	/api/services/:sid	Elimina el servicio. 200 si existe, 404 si no

servicesRouter.delete('/services/:sid', async(req, res) => {

    const { sid } = req.params;
    const foundService = await serviceManager.getServiceById(Number(sid))


    if (!foundService){
        return res.status(404).json({
            status: 'Error.',
            message: 'Service not found.'
        })
    }

    await serviceManager.deleteService(Number(sid));

    res.status(200).json({
        status: 'Success',
        payload: foundService
    })

})
