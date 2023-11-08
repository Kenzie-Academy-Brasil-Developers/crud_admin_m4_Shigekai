import format from "pg-format";
import { CourseList, CourseListQuery, CourseQuery, CreateCourse } from "../interfaces/courses.interface";
import { client } from "../database";
import { UserCourse, UserCourseBody, UserCourseQuery } from "../interfaces/userCourses.interface";
import { QueryConfig } from "pg";

export const postCourseService = async (courseData: CreateCourse) => {
    const queryFormat: string = format(
        `
        INSERT INTO "courses"
            (%I)
        VALUES
            (%L)
        RETURNING *;
        `,
        Object.keys(courseData),
        Object.values(courseData)
    );

    const query: CourseQuery = await client.query(queryFormat);

    return query.rows[0];
};

export const getCoursesService = async () => {
    const queryString: string = "SELECT * FROM courses;";

    const query: CourseListQuery = await client.query(queryString);


    return query.rows;
};

export const enrollUserOnCourseService = async (userCourseData: UserCourseBody) => {
    const queryFormat = format(
        `
        INSERT INTO "userCourses"
            (%I)
        VALUES
            (%L)
        RETURNING *;
        `,
        Object.keys(userCourseData),
        Object.values(userCourseData)
    );

    const query: UserCourseQuery = await client.query(queryFormat);

    return query.rows[0];
};

export const cancelUserEnrollmentService = async (userId: string, courseId: string) => {
    const queryString: string = `
    UPDATE "userCourses"
    SET ("active") = ROW (false)
    WHERE "userId" = $1 AND "courseId" = $2
    RETURNING *;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId, courseId]
    };

    const query: UserCourseQuery = await client.query(queryConfig);

    return query.rows[0];
};

export const getUsersOnCourseService = async (courseId: string) => {
    const queryString: string = `
    SELECT
    "u"."id" AS "userId",
    "u"."name" AS "userName",
    "c"."id" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "uc"."active" AS "userActiveInCourse"
    FROM "courses" AS "c"
    JOIN "userCourses" AS "uc"
        ON "uc"."courseId" = "c"."id"
    JOIN "users" AS "u"
        ON "uc"."userId" = "u"."id"
    WHERE "c"."id" = $1;
`;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [courseId]
    };

    const query = await client.query(queryConfig);

    return query.rows;
};