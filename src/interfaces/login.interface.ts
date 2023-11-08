import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";

export type LoginBody = z.infer<typeof loginSchema>;