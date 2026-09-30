import * as bookingsDao from '../dao/bookings.dao.js';

export async function getAll() {
    return bookingsDao.getAll();
}

export async function getById(id) {
    return bookingsDao.getById(id);
}

export async function create(bookingData) {
    return bookingsDao.create(bookingData);
}

export async function update(id, updateData) {
    return bookingsDao.update(id, updateData);
}