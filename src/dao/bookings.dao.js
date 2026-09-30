import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname,'../data/bookings.json');

export async function getAll(){
    try{
        const data = await fs.readFile(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    }catch(error){
        if (error.code === 'ENOENT' || error instanceof SyntaxError) {
            return [];
        }
        throw error;
    };
};

export async function getById(id) {
    const bookings = await getAll();
    const booking = bookings.find(booking => booking.id === Number(id));
    return booking || null;
};

export async function create(bookingData){
    const bookings = await getAll();
    bookings.push(bookingData);
    await fs.writeFile(FILE_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
    return bookingData;
};

export async function update(id, updateData){
    const bookings = await getAll();
    const bookingToUpdate = bookings.find(booking => booking.id === Number(id));
    if (!bookingToUpdate) {
        return null;
    };
    Object.assign(bookingToUpdate,updateData);
    bookingToUpdate.id = Number(id);
    await fs.writeFile(FILE_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
    return bookingToUpdate;
};