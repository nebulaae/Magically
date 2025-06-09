import { z } from 'zod';

// REGISTER VALIDATION
export const registerSchema = z.object({
    fullname: z.string()
        .min(3, { message: "Длина имени должна быть не меньше 3 символов." })
        .max(32, { message: "Длина имени должна не превышать 32 символов." }),
    username: z.string()
        .min(3, { message: "Длина имени пользователя должна быть не меньше 3 символов." })
        .max(16, { message: "Длина имени пользователя должна не превышать 16 символов." }),
    email: z.string()
        .email({ message: "Неверный формат электронной почты." }),
    bio: z.string()
        .max(72, { message: "Длина имени должна не превышать 72 символа." }),
    password: z.string()
        .min(8, { message: "Длина пароля должна быть не меньше 8 символов." })
        .max(50, { message: "Длина пароля должна не превышать 50 символов." }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

// LOGIN VALIDATION
export const loginSchema = z.object({
    usernameOrEmail: z.string()
        .min(3, { message: "Длина должна быть не меньше 3 символов." })
        .max(50, { message: "Длина должна не превышать 50 символов." })
        .refine(value => value.includes('@') ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : true, {
            message: "Неверный формат имени пользователя или электронной почты."
        }),
    password: z.string().min(8).max(50)
        .min(8, { message: "Длина пароля должна быть не меньше 8 символов." })
        .max(50, { message: "Длина пароля должна не превышать 50 символов." }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;