import {email, z} from 'zod';

const emailSchema = z.string().email().transform((v)=> v.toLowerCase());
const passwordSchema = z.string().min(6).max(50).regex(/[A-Z]/)
  .regex(/[a-z]/)
  .regex(/[0-9]/)
  .regex(/[^A-Za-z0-9]/);

export const registerSchema = z.object({
    userName: z.string().min(3).max(50),
    email: emailSchema,
    password: passwordSchema
})
export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})