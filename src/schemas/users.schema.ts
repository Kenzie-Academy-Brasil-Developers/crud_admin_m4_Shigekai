import {z} from "zod";

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(3).max(50),
    email: z.string().email().min(3).max(50),
    password: z.string().max(120),
    admin: z.boolean().default(false)
});

export const createUserBodySchema = userSchema.omit({id: true});
export const returnUserSchema = userSchema.omit({password: true});
export const getUsersSchema = returnUserSchema.array();

