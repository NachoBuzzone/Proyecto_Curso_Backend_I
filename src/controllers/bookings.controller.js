import { ServiceManager } from '../managers/ServiceManager.js';
import { BookingManager } from '../managers/BookingManager.js';

const serviceManager = new ServiceManager('./src/data/services.json');
const bookingManager = new BookingManager('./src/data/bookings.json');

export class ControllerBookings{

    getAllBookings = async (req, res) =>{
        try{
            const bookings = await bookingManager.getBookings();

            res.status(200).json({
                status: 'Success',
                payload: bookings
        })
        }catch(error){
            return res.status(500).json({
                status:'Error',
                payload:'Error to get bookings'    
            })
        };
    };

    getBooking = async (req, res) =>{
        try{
            const { bid } = req.params;
            const foundBooking = await bookingManager.getBookingById(Number(bid));

            if (foundBooking.error){
                return res.status(404).json({
                    status: 'Error',
                    message: 'Booking not found'
                })
            }
            res.status(200).json({
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

    createBooking = async (req, res) =>{
    try{
        const newBooking = await bookingManager.createBooking(req.body);

        if (newBooking.error){
            return res.status(400).json({
                status:'Error',
                payload:newBooking.error
            });
        }

        res.status(201).json({
            status:'Success',
            payload:newBooking
        });
 
        }catch(error){
            return res.status(500).json({
                status:'Error',
                message:'Error to createa a booking'
            })
        };
    };

    addServiceToAnExistingBooking = async (req, res) =>{
        try{
            const { bid,sid } = req.params;

            const foundBooking = await bookingManager.getBookingById(Number(bid));

            if (foundBooking.error){
                return res.status(404).json({
                    status: 'Error',
                    message: foundBooking.error
                })
            }

            const foundService = await serviceManager.getServiceById(Number(sid));

            if (foundService.error){
                return res.status(404).json({
                    status: 'Error',
                    message: foundService.error
                })
            };

            const updateBooking = await bookingManager.addServiceToBooking(bid,sid)

            res.status(200).json({
                status: 'Success',
                payload: updateBooking
            })
        }catch(error){
            return res.status(500).json({
                status:'Error',
                message:'Error adding the service to the booking'
            })

        };
    };
}
