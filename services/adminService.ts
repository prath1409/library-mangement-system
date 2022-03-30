import { v4 as uuidv4 } from 'uuid';
import { Response, Request } from 'express';
import { IGetUserAuthInfoRequest, Books, User, Users } from "../serviceTypes"
import { RES_STATUS, regexp } from '../constants';
import { adminQueries } from '../database/dbQueries';
import { databaseQuery } from '../database/db_queryFunction';
import { QueryResult } from 'pg'


/**
 * This function is to add books in db by librarian i.e admin
 * and returns Books object.
 * @param {Request["body"]} body is req.body which is an object or undefined.
 * @param {User} reqUser is req.user which is an object of type User. 
 * @returns {Promise<Books>} Books is an object.   
*/
export const addBook = async (body: Request["body"], reqUser: User): Promise<Books> => {
    try {

        const validate: Books | null = bookValidator(body, reqUser);
        if (validate)// validateBook
            return (validate);
        const librarianId: string | undefined = reqUser.id
        let entry: string[] | null = body.name.match(regexp);
        let bookName = entry?.join(' ');
        bookName?.toString();
        const book: QueryResult = await databaseQuery(adminQueries.AddBooks.book_name, [bookName]);
        if (book.rowCount) {
            const bookId = book.rows[0].id;
            await databaseQuery(adminQueries.AddBooks.updateBook, [body.available_count, librarianId, bookId]);
            const ans: QueryResult = await databaseQuery(adminQueries.AddBooks.book, [bookId]);
            return ({ status: RES_STATUS.SUCCESS, book: ans.rows[0] });
        }
        else {
            const bookId: string = uuidv4();
            await databaseQuery(adminQueries.AddBooks.addBook, [bookId, bookName, body.available_count, librarianId, librarianId]);
            const ans: QueryResult = await databaseQuery(adminQueries.AddBooks.book, [bookId]);
            return ({ status: RES_STATUS.SUCCESS, book: ans.rows[0] });
        }
    }
    catch (err) {
        throw err;
    }
}


/**
 * This function is to get students data by issued book id in db by librarian i.e admin
 * and returns Books object.
 * @param {string} bookId is a books id of type string
 * @param {User} reqUser is req.user which is an object of type User. 
 * @returns {Promise<Users>} Users is an object.   
*/
export const getStudents = async (bookName: string, reqUser: User): Promise<Users> => {
    try {
        if (reqUser.role != 'admin')
            return ({ status: RES_STATUS.FORBIDDEN, message: 'Forbidden not allowed' });
        if (!bookName)
            return ({ status: RES_STATUS.BAD_REQUEST, message: 'Book id required' });
        let entry: string[] | null = bookName.match(regexp);
        let book_name = entry?.join(' ');
        const book: QueryResult = await databaseQuery(adminQueries.StudentData.book, [book_name]);
        if (!book.rowCount)
            return ({ status: RES_STATUS.NOT_FOUND, message: 'Book not exists' });
        const bookId: string = book.rows[0].id
        const ans: QueryResult = await databaseQuery(adminQueries.StudentData.students, [bookId]);
        if (!ans.rowCount)
            return ({ status: RES_STATUS.NOT_FOUND, message: 'Book is not issued' })
        return ({ status: RES_STATUS.SUCCESS, users: ans.rows });
    }
    catch (err) {
        throw err;
    }

}

/**
 * This function is to get issued books data by user id in db by librarian i.e admin
 * and returns Books object.
 * @param {string} userId is a users id of type string
 * @param {User} reqUser is req.user which is an object of type User. 
 * @returns {Promise<Users>} Users is an object.   
*/
export const getIssuedBooks = async (userName: string, reqUser: User): Promise<Users> => {

    try {
        if (reqUser.role != 'admin')
            return ({ status: RES_STATUS.FORBIDDEN, message: 'Forbidden not allowed' });
        if (!userName)
            return ({ status: RES_STATUS.BAD_REQUEST, message: 'Username required' });
        const user: QueryResult = await databaseQuery(adminQueries.issuedBooksByUserId.user, [userName]);
        if (!user.rowCount)
            return ({ status: RES_STATUS.NOT_FOUND, message: 'User not exists' });
        const userId: string = user.rows[0].id;
        const ans: QueryResult = await databaseQuery(adminQueries.issuedBooksByUserId.books, [userId]);
        if (!ans.rowCount)
            return ({ status: RES_STATUS.NOT_FOUND, message: 'User has not issued anything' })
        return ({ status: RES_STATUS.SUCCESS, users: ans.rows });
    }
    catch (err) {
        throw err;
    }
}


/**
 * This function is a helper function for validation of of request body parameters for addBooks route 
 * and returns Books object or null
 * @param {Request["body"]} body is req.body which is an object or undefined. 
 * @param {User} reqUser is req.user which is an object of type User. 
 * @returns {Books | null} Books is an object.   
*/
export function bookValidator(body: Request["body"], reqUser: User): Books | null {
    if (reqUser.role != 'admin')
        return { status: RES_STATUS.FORBIDDEN, message: 'Forbidden not allowed' };
    else if (!body.name)
        return { status: RES_STATUS.BAD_REQUEST, message: "Name required" };
    else if (!body.available_count)
        return { status: RES_STATUS.BAD_REQUEST, message: "Available_count required" };
    else if (Object.values(body).length != 2)
        return { status: RES_STATUS.BAD_REQUEST, message: "Two parameters required" };
    else
        return null;
}
