
import { v4 as uuidv4 } from 'uuid';
import { Response, NextFunction, response, Request } from 'express';
import bcryptjs from 'bcryptjs';
import { JsonWebTokenError } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { IGetUserAuthInfoRequest, User, Users, jwtUser } from "../serviceTypes";
import { RES_STATUS, regexpLogger } from '../constants';
import { logQueries } from '../database/dbQueries';
import { databaseQuery } from '../database/db_queryFunction';
import { } from 'path';
import { rejects } from 'assert';
import { QueryResult } from 'pg'

/**
 * This function is a helper function for registeration of user and returns user object from database.
 * @param {Request["body"]} body is req.body which is an object or undefined.  
 * @returns {Users} Users is an object.   
*/
export const userRegistration = async (body: Request["body"]): Promise<Users> => {

    try {
        const validate: Users | null = registrationValidator(body);
        if (validate) {
            return (validate);
        }
        if (!regexpLogger.test(body.email)) {
            return ({ status: RES_STATUS.BAD_REQUEST, message: "Email Id invalid" });
        }
        const user: QueryResult = await databaseQuery(logQueries.Register.user, [body.email]);
        if (user.rowCount) {
            return ({ status: RES_STATUS.BAD_REQUEST, message: 'User already exits' });
        }
        const hashedPassword: string = await bcryptjs.hash(body.password, 10);
        const userId: string = uuidv4();
        await databaseQuery(logQueries.Register.adduser, [userId, body.role.toLowerCase(), body.name, body.email, hashedPassword, userId, userId]);
        return ({ status: RES_STATUS.SUCCESS, message: 'User Registered Successfully' });
    }
    catch (err) {
        throw err;
    }

}

/**
 * This function is a helper function for loginof user of and returns user object from database.
 * @param {string} username is a username from req.body.username.
 * @param {string} password is a password from req.body.username. 
 * @param {number} numberParams is a number of values in body.
 * @returns {Users} Users is an object.
*/
export const userLogin = async (username: string, password: string, numberParams: number): Promise<Users> => {

    try {
        const validate: Users | null = loginValidator(username, password, numberParams);
        if (validate) {
            return (validate);
        }
        let passCode: QueryResult = await databaseQuery(logQueries.login.passcode, [username]);
        if (!passCode.rowCount) {
            return ({ status: RES_STATUS.NOT_FOUND, message: 'User not exists' });
        }
        const passKey = passCode.rows[0];
        if (await bcryptjs.compare(password, passKey.passcode)) {
            const user: User = { id: passKey.id, email: username, role: passKey.role };
            const accessToken: string = jwt.sign(user, String(process.env.SECRET_TOKEN), { expiresIn: "12000s" });
            return ({ status: RES_STATUS.SUCCESS, user: { accessToken: accessToken } });
        }
        else {
            return ({ status: RES_STATUS.NOT_AUTHORIZED, message: 'Invalid Password' });
        }
    }
    catch (err) {
        throw err;
    }

}



/**
 * This function is an middle ware to authenticate token passed by user returns user object from database.
 * @param {IGetUserAuthInfoRequest} req is request of IGetUserAuthInfoRequest which extends express.Request
 * @param {Response} res is response of express.Response
 * @param {NextFunction} next is of express.NextFunction  
 * @returns {Response<any, Record<string, any>> | undefined} 
*/
export function authenticateToken(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(RES_STATUS.NOT_AUTHORIZED).json({ message: 'Requires Token or authentication' });
    }
    jwt.verify(token, String(process.env.SECRET_TOKEN), (err: unknown, user: any) => {
        if (err) {
            return res.status(RES_STATUS.NOT_AUTHORIZED).json({ message: 'Invalid Token' });
        }
        req.user = user;
        next();
    });
}


/**
 * This function is a helper function for validation of of request body parameters for register route 
 * and returns user object from database.
 * @param {Request["body"]} body is req.body which is an object or undefined.  
 * @returns {Users | null} Users is an object.   
*/
export function registrationValidator(body: Request["body"]): Users | null {
    if (Object.values(body).length == 0)
        return { status: RES_STATUS.BAD_REQUEST, message: "Four parameters required" };
    else if (!body.role)
        return { status: RES_STATUS.BAD_REQUEST, message: "Role required" };
    else if (!body.name)
        return { status: RES_STATUS.BAD_REQUEST, message: "Name required" };
    else if (!body.email)
        return { status: RES_STATUS.BAD_REQUEST, message: "Email required" };
    else if (!body.password)
        return { status: RES_STATUS.BAD_REQUEST, message: "Password required" };
    else if (body.password.length < 5)
        return { status: RES_STATUS.BAD_REQUEST, message: "Password must be atleast 5 digit long" };
    else if (Object.values(body).length != 4)
        return { status: RES_STATUS.BAD_REQUEST, message: "Four parameters required" };
    else if (body.role.toLowerCase() != 'user' && body.role.toLowerCase() != 'admin')
        return { status: RES_STATUS.BAD_REQUEST, message: "Roles are only admin and user" };
    else
        return null;
}


/**
 * This function is a helper function for validation of of request body parameters for login route 
 * and returns user object from database.
 * @param {Request["body"]} body is req.body which is an object or undefined. 
 * @returns {Users | null} Users is an object.   
*/
export function loginValidator(username: string, password: string, numberParams: number): Users | null {
    if (numberParams == 0)
        return { status: RES_STATUS.BAD_REQUEST, message: "Two parameters required" };
    else if (!username)
        return { status: RES_STATUS.BAD_REQUEST, message: "Username required" };
    else if (!password)
        return { status: RES_STATUS.BAD_REQUEST, message: "Password required" };
    else if (numberParams != 2)
        return { status: RES_STATUS.BAD_REQUEST, message: "Two parameters required" };
    else
        return null;
}
