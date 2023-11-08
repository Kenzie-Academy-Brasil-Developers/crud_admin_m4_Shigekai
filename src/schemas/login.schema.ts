import { userSchema } from "./users.schema";

export const loginSchema = userSchema.pick({
    email: true,
    password: true
});