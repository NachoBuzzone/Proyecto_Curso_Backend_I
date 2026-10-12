import * as servicesService from '../services/services.service.js';
import * as bookingsService from '../services/bookings.service.js';

export async function renderServices(req, res) {
    try {
        const services = await servicesService.getServices();
        
        return res.render('services', {
            title: 'Listado de Servicios',
            services
        });
    } catch (error) {
        return res.status(500).render('error', { 
            message: 'Error to render the services' 
        });
    }
}
export async function renderBookings(req, res) {
    try {
        const bookings = await bookingsService.getBookings();
        
        return res.render('bookings', {
            title: 'Listado de Reservas',
            bookings
        });
    } catch (error) {
        return res.status(500).render('error', { 
            message: 'Error to render the bookings' 
        });
    }
}