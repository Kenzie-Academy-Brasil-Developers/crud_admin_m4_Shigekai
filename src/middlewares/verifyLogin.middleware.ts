import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { User, UserQueryResult } from "../interfaces/users.interface";
import { client } from "../database";
import AppError from "../errors/App.error";
import { compare } from "bcryptjs";

export const verifyLogin =  async (req: Request, res: Response, next: NextFunction) => {
    const queryString: string = "SELECT * FROM users WHERE email = $1;";

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.body.email]
    };

    const query: UserQueryResult = await client.query(queryConfig);

    if(!query.rowCount){
        throw new AppError("Wrong email/password", 401);
    };

    const user: User = query.rows[0];

    const verifyPassword: boolean = await compare(req.body.password, user.password);

    if(!verifyPassword){
        throw new AppError("Wrong email/password", 401)
    };

    res.locals = {...res.locals, user: user};
    
    return next();
};