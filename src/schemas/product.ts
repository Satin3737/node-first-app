import {z} from 'zod';

export const PostProductRequestSchema = z.object({
    id: z.string().optional(),
    title: z
        .string()
        .trim()
        .min(3, 'Title must be at least 3 characters long')
        .max(100, 'Title must be at most 100 characters long'),
    imageUrl: z.url('Invalid Image URL'),
    description: z
        .string()
        .trim()
        .min(10, 'Description must be at least 10 characters long')
        .max(1000, 'Description must be at most 1000 characters long'),
    price: z.coerce.number().min(0, 'Price must be a positive number')
});

export type IPostProductRequest = z.infer<typeof PostProductRequestSchema>;
