import express from 'express'
import { BookingManager } from '../managers/BookingManager.js';
import { ServiceManager } from '../managers/ServiceManager.js';


export const bookingsRouter = express.Router();

bookingsRouter.use(express.json())
const bookingManager = new BookingManager('./src/data/bookings.json');
const serviceManager = new ServiceManager('./src/data/services.json');


// GET /api/bookings/:bid devuelve una reserva por id.
bookingsRouter.get('/bookings/:bid', async (req, res) =>{

    const { bid } = req.params;
    const foundBooking = await bookingManager.getBookingById(Number(bid));

    if (!foundBooking){
        return res.status(404).json({
            status: 'Error',
            message: 'Booking not found'
        })
    }

    res.status(200).json({
        status: 'Success',
        payload: foundBooking
    })
});


//POST	/api/bookings	crea una reserva (puede iniciarse con services vacío).

bookingsRouter.post('/bookings', async (req, res)=>{

    const { clientName, clientEmail, date, time, status, services} = req.body;

    if(!clientName || !clientEmail || !date || !time || !status){
        return res.status(400).json({
            status: 'Error',
            message: 'Required fields are missing'
        })
    };

    const newBooking = await bookingManager.createBooking({
        clientName,
        clientEmail,
        date,
        time,
        status,
        services //si esta vacio se inicializa vacio
    });

    res.status(201).json({
        status: 'Success',
        payload: newBooking
    })
});


//POST /api/bookings/:bid/services/:sid  agrega un servicio a una reserva existente, validando que ambos existan.

bookingsRouter.post('/bookings/:bid/services/:sid', async (req, res)=>{

    const { bid,sid } = req.params;

    const foundBooking = await bookingManager.getBookingById(Number(bid));

    if (!foundBooking){
        return res.status(404).json({
            status: 'Error',
            message: 'Booking not found'
        })
    }

    const foundService = await serviceManager.getServiceById(Number(sid));

    if (!foundService){
        return res.status(404).json({
            status: 'Error',
            message: 'Service not found'
        })
    }

    const updateBooking = await bookingManager.addServiceToBooking(bid,sid)

    res.status(200).json({
        status: 'Success',
        payload: updateBooking
    })
})