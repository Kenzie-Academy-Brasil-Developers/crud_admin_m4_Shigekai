import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import AppError from "../errors/App.error";

export const verifyUserEnrollment = async (req: Request, res: Response, next: NextFunction) => {
    const queryString = `SELECT * FROM "userCourses" WHERE "userId" = $1;`;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id]
    };

    const query = await client.query(queryConfig);

    if(!query.rowCount) throw new AppError("No course found", 404);

    return next();
};