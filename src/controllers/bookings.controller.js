import * as bookingsService from '../services/bookings.service.js';

export async function getAllBookings(req, res){
    try{
        const bookings = await bookingsService.getBookings();

        res.status(200).json({
            status: 'Success',
            payload: bookings
    })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            message:'Error to get bookings'    
        })
    };
};

export async function getBookingById(req, res){
    try{
        const { bid } = req.params;
        const foundBooking = await bookingsService.getBookingById(bid);

        if (foundBooking.error){
            return res.status(404).json({
                status: 'Error',
                message: foundBooking.error 
            })
        }
        return res.status(200).json({
            status: 'Success',
            payload: foundBooking
        });
    }catch(error){
        return res.status(500).json({
            status:'Error',
            message:'Error to get booking'
        })
    };
};

export async function createBooking(req, res){
    try{
        const newBooking = await bookingsService.createBooking(req.body);
        
        if (newBooking.error) {
            return res.status(400).json({
                status: 'Error',
                message: newBooking.error
            });
        };
        res.status(201).json({
            status:'Success',
            payload:newBooking
        });

        }catch(error){
            return res.status(500).json({
                status:'Error',
                message:'Error to create a booking'
            })
        };
};

export async function addServiceToBooking(req, res){
    try{
        const { bid,sid } = req.params;

        const result = await bookingsService.addServiceToBooking(bid, sid);

        if (result.error){
            return res.status(404).json({
                status: 'Error',
                message: result.error
            })
        }

        return res.status(200).json({
            status: 'Success',
            payload: result
        });
    }catch(error){
        return res.status(500).json({
            status:'Error',
            message:'Error adding the service to the booking'
        })
    };
};