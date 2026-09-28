import { z } from 'zod';

export const activitySchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    category: z.string().min(1, { message: 'Category is required' }),
    date: z.coerce.date({ required_error: 'Date is required', invalid_type_error: 'Date is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    venue: z.string().min(1, { message: 'Venue is required' }),
    latitude: z.number(),
    longitude: z.number(),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
