import fs from 'node:fs/promises';

export class BookingManager{
    constructor(filePath){
        this.path = filePath;
    }

    //Devuelve todos los bookings.
    async getBookings(){
        try{
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        }catch(error){
            if (error.code === 'ENOENT' || error instanceof SyntaxError) {
                return [];
            }
            throw error;
        }
    }

    //Devuelve el booking o null/mensaje de error.
    async getBookingById(id) {
        const data = await this.getBookings();
        const booking = data.find(booking => booking.id === Number(id));
        return booking || null;
    }

    //Agrega un servicio; El id se genera automáticamente (no se recibe como parámetro); Valida que estén presentes: clientName, clientEmail, date, time, status, services: []; rechaza servicios incompletos
    async createBooking(bookingData){
        const data = await this.getBookings()
        const newID = data.length > 0 ? data[data.length - 1].id + 1 : 1
        const newBooking = {
            "id": newID,
            "clientName": bookingData.clientName,
            "clientEmail":bookingData.clientEmail,
            "date": bookingData.date,
            "time": bookingData.time,
            "status": bookingData.status,
            "services": bookingData.services,
        }
        if ( !newBooking.clientName || !newBooking.clientEmail || !newBooking.date || !newBooking.time || !newBooking.status){
            return "The booking you want to add is incomplete."
        }

        data.push(newBooking);
        await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
        return newBooking;
    }

    async addServiceToBooking(bid, sid) {
        const bookings = await this.getBookings();
        const bookingIndex = bookings.findIndex(b => b.id === Number(bid));

        if (bookingIndex === -1) {
            return null; // o { error: 'Booking not found.' }
        }

        const booking = bookings[bookingIndex];
        const serviceIndex = booking.services.findIndex(s => s.service === Number(sid));

        if (serviceIndex !== -1) {
            booking.services[serviceIndex].quantity += 1;
        } else {
            booking.services.push({
                service: Number(sid),
                quantity: 1
            });
        }

        await fs.writeFile(this.path, JSON.stringify(bookings, null, 2));
        return booking;
    }
}


