import * as bookingsRepositories from '../repositories/bookings.repositories.js';
import * as servicesRepositories from '../repositories/services.repositories.js';

export async function getBookings(){
    return bookingsRepositories.getAll();
}   

export async function getBookingById(id){
    const booking = await bookingsRepositories.getById(Number(id));
    if (!booking) {
        return { error: 'Booking not found.' };
    }
    return booking;
}

export async function createBooking(bookingData){
    const { clientName, clientEmail, date, time, status, services } = bookingData;

    if ( !clientName || !clientEmail || !date || !time || !status ){
        return { error: 'The booking you want to add is incomplete.' }
    };
    const data = await bookingsRepositories.getAll();
    const newID = data.length > 0 ? data[data.length - 1].id + 1 : 1
    const newBooking = {
        id: newID,
        clientName,
        clientEmail,
        date,
        time,
        status,
        services: Array.isArray(services) ? services : []
    };
    return bookingsRepositories.create(newBooking);
}

export async function addServiceToBooking(bid, sid){
    const bookingId = Number(bid);
    const serviceId = Number(sid);

    const booking = await bookingsRepositories.getById(bookingId);
    if (!booking) {
        return { error: 'Booking not found.' };
    };

    const service = await servicesRepositories.getById(serviceId);
    if (!service) {
        return { error: 'Service not found.' };
    };

    const serviceIndex = booking.services.findIndex(s => s.service === serviceId);
    if (serviceIndex !== -1) {
        booking.services[serviceIndex].quantity += 1;
    } else {
        booking.services.push({
            service: serviceId,
            quantity: 1
        });
    }
    return await bookingsRepositories.update(bookingId, booking);
};