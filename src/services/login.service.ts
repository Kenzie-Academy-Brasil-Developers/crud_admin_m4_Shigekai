import { QueryConfig } from "pg";
import { LoginBody } from "../interfaces/login.interface";
import { User, UserQueryResult } from "../interfaces/users.interface";
import { client } from "../database";
import { sign } from "jsonwebtoken";

export const loginService = async (user: User) => {

    const token: string = sign(
        {email: user.email, admin: user.admin},
        process.env.SECRET_KEY!,
        {subject: user.id.toString(), expiresIn: "1h"}
    );

    return token;
};