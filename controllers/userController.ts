import { Response, NextFunction } from 'express';
import * as logServices from '../services/logService';
import * as userServices from '../services/userService';
import * as adminServices from '../services/adminService'
import { IGetUserAuthInfoRequest, Users, Books } from "../serviceTypes"
import { RES_STATUS } from '../constants';


/**
 * This function is a controller function for register route and returns void. 
 * @param {IGetUserAuthInfoRequest} req is request of IGetUserAuthInfoRequest which extends express.Request 
 * @param {Response} res is response of express.Response. 
 * @returns {Promise<void>}  
*/
export const registerUser = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    try {
        const result: Users = await logServices.userRegistration(req.body);
        if (result.message) {
            res.status(result.status).json({ message: result.message });
        }
        else {
            res.status(result.status).json(result.user);
        }
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(RES_STATUS.SERVER_ERROR).json({ message: err.message });
        }
    }
}

/**
 * This function is a controller function for login route and returns void. 
 * @param {IGetUserAuthInfoRequest} req is request of IGetUserAuthInfoRequest which extends express.Request 
 * @param {Response} res is response of express.Response. 
 * @returns {Promise<void>}  
*/
export const userLogger = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result: Users = await logServices.userLogin(req.body.username, req.body.password, Object.values(req.body).length);
        if (result.message) {
            res.status(result.status).json({ message: result.message });
        }
        else {
            res.status(result.status).json(result.user);
        }
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(RES_STATUS.SERVER_ERROR).json({ message: err.message });
        }
    }
}

/**
 * This function is a controller function for addBooks route and returns void. 
 * @param {IGetUserAuthInfoRequest} req is request of IGetUserAuthInfoRequest which extends express.Request 
 * @param {Response} res is response of express.Response. 
 * @returns {Promise<void>}  
*/
export const setBooks = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    try {
        const result: Books = await adminServices.addBook(req.body, req.user);
        if (result.message) {
            res.status(result.status).json({ message: result.message });
        }
        else {
            res.status(result.status).json(result.book);
        }
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(RES_STATUS.SERVER_ERROR).json({ message: err.message });
        }
    }
}



/**
 * This function is a controller function for availableBooks route and returns void. 
 * @param {IGetUserAuthInfoRequest} req is request of IGetUserAuthInfoRequest which extends express.Request 
 * @param {Response} res is response of express.Response. 
 * @returns {Promise<void>}  
*/
export const getAvailBooks = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    try {
        const result: Books = await userServices.availableBooks(req.user);
        if (result.message) {
            res.status(result.status).json({ message: result.message });
        }
        else {
            res.status(result.status).json(result.books);
        }
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(RES_STATUS.SERVER_ERROR).json({ message: err.message });
        }
    }
}


/**
 * This function is a controller function for raiseBook route and returns void. 
 * @param {IGetUserAuthInfoRequest} req is request of IGetUserAuthInfoRequest which extends express.Request 
 * @param {Response} res is response of express.Response. 
 * @returns {Promise<void>}  
*/
export const requestBook = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    try {
        const result: Books = await userServices.requestBook(req.body.name, Object.values(req.body).length, req.user);
        if (result.message) {
            res.status(result.status).json({ message: result.message });
        }
        else {
            res.status(result.status).json(result.books);
        }
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(RES_STATUS.SERVER_ERROR).json({ message: err.message });
        }
    }
}


/**
 * This function is a controller function for issuedBooks route and returns void. 
 * @param {IGetUserAuthInfoRequest} req is request of IGetUserAuthInfoRequest which extends express.Request 
 * @param {Response} res is response of express.Response. 
 * @returns {Promise<void>}  
*/
export const getIssuedBooks = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    try {
        const result: Books = await userServices.issuedBooks(req.user);
        if (result.message) {
            res.status(result.status).json({ message: result.message });
        }
        else {
            res.status(result.status).json(result.books);
        }
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(RES_STATUS.SERVER_ERROR).json({ message: err.message });
        }
    }
}

/**
 * This function is a controller function for retunBook route and returns void. 
 * @param {IGetUserAuthInfoRequest} req is request of IGetUserAuthInfoRequest which extends express.Request 
 * @param {Response} res is response of express.Response. 
 * @returns {Promise<void>}  
*/
export const returnIssuedBook = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    try {
        const result: Books = await userServices.returnBook(req.params.id, req.user);
        if (result.message) {
            res.status(result.status).json({ message: result.message });
        }
        else {
            res.status(result.status).json(result.book);
        }
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(RES_STATUS.SERVER_ERROR).json({ message: err.message });
        }
    }
}

/**
 * This function is a controller function for getStudentsByBookId route and returns void. 
 * @param {IGetUserAuthInfoRequest} req is request of IGetUserAuthInfoRequest which extends express.Request 
 * @param {Response} res is response of express.Response. 
 * @returns {Promise<void>}  
*/
export const getStudentData = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    try {

        const result: Users = await adminServices.getStudents(req.params.id, req.user);
        if (result.message) {
            res.status(result.status).json({ message: result.message });
        }
        else {
            res.status(result.status).json(result.users);
        }
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(RES_STATUS.SERVER_ERROR).json({ message: err.message });
        }
    }
}

/**
 * This function is a controller function for getBooksByUserId and returns void. 
 * @param {IGetUserAuthInfoRequest} req is request of IGetUserAuthInfoRequest which extends express.Request 
 * @param {Response} res is response of express.Response. 
 * @returns {Promise<void>}  
*/
export const getBooksData = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    try {

        const result: Users = await adminServices.getIssuedBooks(req.params.id, req.user);
        if (result.message) {
            res.status(result.status).json({ message: result.message });
        }
        else {
            res.status(result.status).json(result.users);
        }
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(RES_STATUS.SERVER_ERROR).json({ message: err.message });
        }
    }
}
