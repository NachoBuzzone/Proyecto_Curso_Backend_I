import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: "El ID del servicio debe ser un ObjectId válido de MongoDB"
});

export const bookingServiceItemSchema = z.object({
  service: objectIdSchema,
  quantity: z.number().int().positive({ message: "La cantidad debe ser un entero positivo" }).default(1)
});

export const createBookingSchema = z.object({
  clientName: z.string({ required_error: "El nombre del cliente es obligatorio" }).trim().min(2, "El nombre debe tener al menos 2 caracteres"),
  clientEmail: z.string({ required_error: "El email del cliente es obligatorio" }).trim().min(2),
  date: z.string({ required_error: "La fecha es obligatoria" }).regex(/^\d{4}-\d{2}-\d{2}$/, "El formato de fecha debe ser YYYY-MM-DD (ej: 2026-10-25)"),
  time: z.string({ required_error: "La hora es obligatoria" }).regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "El formato de hora debe ser HH:mm (ej: 14:30)"),
  status: z.enum(["pending", "confirmed", "cancelled"], {errorMap: () => ({ message: "El estado debe ser pending, confirmed o cancelled" })}).default("pending"),
  services: z.array(bookingServiceItemSchema).default([])
});

export const updateBookingSchema = createBookingSchema.partial();
