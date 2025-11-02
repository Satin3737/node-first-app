import {z} from 'zod';

export const PostLoginRequestSchema = z.object({
    email: z.email('Invalid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(24, 'Password must be at most 24 characters long')
});

export type IPostLoginRequest = z.infer<typeof PostLoginRequestSchema>;

export const PostSignupRequestSchema = z
    .object({
        ...PostLoginRequestSchema.shape,
        confirmPassword: PostLoginRequestSchema.shape.password,
        name: z
            .string()
            .min(2, 'Name must be at least 2 characters long')
            .max(50, 'Name must be at most 50 characters long')
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword']
    });

export type IPostSignupRequest = z.infer<typeof PostSignupRequestSchema>;
