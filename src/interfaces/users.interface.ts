import { z } from "zod";
import { createUserBodySchema, getUsersSchema, returnUserSchema, userSchema } from "../schemas/users.schema";
import { QueryResult } from "pg";

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserBodySchema>;
export type ReturnUser = z.infer<typeof returnUserSchema>;
export type ReturnUsers = z.infer<typeof getUsersSchema>;
export type UserQueryResult = QueryResult<User>;
export type UsersQueryResult = QueryResult<User[]>;