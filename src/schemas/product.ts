import {z} from 'zod';

export const ProductImageSchema = z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string().refine(type => type.startsWith('image/'), 'Invalid image file')
});

export type IProductImage = z.infer<typeof ProductImageSchema>;

export const PostProductRequestSchema = z.object({
    id: z.string().optional(),
    title: z
        .string()
        .trim()
        .min(3, 'Title must be at least 3 characters long')
        .max(100, 'Title must be at most 100 characters long'),
    description: z
        .string()
        .trim()
        .min(10, 'Description must be at least 10 characters long')
        .max(1000, 'Description must be at most 1000 characters long'),
    price: z.coerce.number().min(0, 'Price must be a positive number')
});

export type IPostProductRequest = z.infer<typeof PostProductRequestSchema>;
