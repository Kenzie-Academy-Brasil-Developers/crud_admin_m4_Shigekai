import { hash } from "bcryptjs";
import { CreateUser, ReturnUser, ReturnUsers, UsersQueryResult } from "../interfaces/users.interface";
import { client } from "../database";
import { getUsersSchema, returnUserSchema } from "../schemas/users.schema";
import format from "pg-format";
import { QueryConfig } from "pg";

export const createUserService = async (data: CreateUser ) => {
    data.password = await hash(data.password, 12);

    const queryFormat: string = format(
        "INSERT INTO users (%I) VALUES (%L) RETURNING *;",
        Object.keys(data),
        Object.values(data)
    );

    const query = await client.query(queryFormat);

    const parsedUser: ReturnUser = returnUserSchema.parse(query.rows[0]);
    
    return parsedUser;
};

export const getUsersService = async () => {
    const queryString: string = "SELECT * FROM users;";

    const query: UsersQueryResult = await client.query(queryString);

    const users: ReturnUsers = getUsersSchema.parse(query.rows);

    return users;
};

export const getUsersCoursesService = async (userId: string) => {
    const queryString: string = `
    SELECT
    "c"."id" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "uc"."active" AS "userActiveInCourse",
    "u"."id" AS "userId",
    "u"."name" AS "userName"
    FROM "courses" AS "c"
    JOIN "userCourses" AS "uc"
        ON "uc"."courseId" = "c"."id"
    JOIN "users" AS "u"
        ON "uc"."userId" = "u"."id"
    WHERE "u"."id" = $1;
    `;


    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    };

    const query = await client.query(queryConfig);

    console.log(query);

    return query.rows[0];
};

export const getUserCoursesService = async (userId: string) => {
    const queryString: string = `
    SELECT
    "uc"."courseId" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "uc"."active" AS "userActiveInCourse",
    "uc"."userId" AS "userId",
    "u"."name" AS "userName"
    FROM "userCourses" AS "uc"
    JOIN "courses" AS "c"
        ON "c"."id" = "uc"."courseId"
    JOIN "users" AS "u"
        ON "u"."id" = "uc"."userId"
    WHERE "u"."id" = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    };

    const query = await client.query(queryConfig);

    return query.rows;
    
};