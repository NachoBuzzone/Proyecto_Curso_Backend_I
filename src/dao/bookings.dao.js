import Booking from "../models/booking.model.js"

export async function getAll(){
    try{
        const bookings = await Booking.find().lean();
        return bookings;
    } catch (error) {
        console.error('Error al obtener bookings de MongoDB:', error);
        throw error;
    }
};

export async function getById(id, { populate = false } = {}) {
    try {
        let query = Booking.findById(id);

        if (populate){
            query = query.populate("services.service")
        }
        const booking = await query.lean();
        return booking || null;
    } catch (error) {
        console.error('Error al buscar un booking por ID en MongoDB:', error);
        throw error;
    };
};

export async function create(bookingData){
    try {
        const newBooking = await Booking.create(bookingData);
        return newBooking.toObject();
    } catch (error) {
        console.error('Error al crear el booking en MongoDB:', error);
        throw error;
    }
};

export async function update(id, updateData){
    try {
        const bookingToUpdate = await Booking.findByIdAndUpdate(id, updateData, { new: true , runValidators : true }).lean();
        return bookingToUpdate || null;
    } catch (error) {
        console.error('Error al actualizar el booking en MongoDB:', error);
        throw error;
    }
};