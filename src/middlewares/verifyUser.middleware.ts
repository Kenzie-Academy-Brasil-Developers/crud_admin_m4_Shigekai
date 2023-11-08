import { QueryConfig } from "pg"
import { client } from "../database";
import { UserQueryResult } from "../interfaces/users.interface";
import AppError from "../errors/App.error";
import { NextFunction, Request, Response } from "express";

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    const queryString: string = `SELECT * FROM users WHERE id = $1;`

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.userId]
    };

    const query: UserQueryResult = await client.query(queryConfig);

    if(!query.rowCount) throw new AppError("User/course not found", 404);

    return next();
};