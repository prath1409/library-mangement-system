import { Books, User } from "../serviceTypes"
import { adminQueries, userQueries } from '../database/dbQueries';
import { RES_STATUS, regexp } from '../constants';
import { databaseQuery } from '../database/db_queryFunction';
import { QueryResult } from 'pg'

/**
 * This function returns available books from database.
 * @param {null}  takes no params. 
 * @returns {Promise<Books>} Books is a array of objects i.e of books where each book has there specific attributes.   
 */
export const availableBooks = async (reqUser: User): Promise<Books> => {
    try {
        if (reqUser.role == 'admin') {
            const ans: QueryResult = await databaseQuery(adminQueries.allBooks.books);
            if (!ans.rowCount) {
                return ({ status: RES_STATUS.NOT_FOUND, message: 'No books' });
            }
            return ({ status: RES_STATUS.SUCCESS, books: ans.rows });
        }
        const ans: QueryResult = await databaseQuery(userQueries.AvailBooks.availBooks);
        if (!ans.rowCount) {
            return ({ status: RES_STATUS.NOT_FOUND, message: 'No available books' });
        }
        return ({ status: RES_STATUS.SUCCESS, books: ans.rows });
    }
    catch (err) {
        throw err;
    }

}



/**
 * This function is to request book and returns issued books from database.
 * @param {string} bookId is a book id.
 * @param {User} reqUser is req.user which is an object of type User.   
 * @returns {Promise<Books>} Books is a array of objects i.e of books where each book has there specific attributes.   
*/
export const requestBook = async (bookName: string, numberParams: number, reqUser: User): Promise<Books> => {

    try {
        if (reqUser.role == 'admin') {
            return ({ status: RES_STATUS.FORBIDDEN, message: 'Forbidden not allowed' });
        }
        if (!bookName) {
            return ({ status: RES_STATUS.BAD_REQUEST, message: 'Book name required' });
        }
        if (numberParams != 1) {
            return ({ status: RES_STATUS.BAD_REQUEST, message: 'Only one parameters required' });
        }
        let entry: string[] | null = bookName.match(regexp);
        let book_name = entry?.join(' ');
        book_name?.toString();
        const book: QueryResult = await databaseQuery(userQueries.RequestBook.book, [book_name])
        if (!book.rowCount) {
            return ({ status: RES_STATUS.BAD_REQUEST, message: 'Book name invalid' });
        }
        const bookId: string = book.rows[0].id;
        const userId = reqUser.id;
        const userBookMaped: QueryResult = await databaseQuery(userQueries.RequestBook.user_mapped, [bookId, userId]);
        if (userBookMaped.rowCount) {
            return ({ status: RES_STATUS.BAD_REQUEST, message: 'Book already issued' });
        }
        const availableBooks: QueryResult = await databaseQuery(userQueries.RequestBook.get_available, [bookId]);
        if (!availableBooks.rowCount) {
            return ({ status: RES_STATUS.NOT_FOUND, message: 'No available books' });
        }
        await databaseQuery(userQueries.RequestBook.add_maping, [bookId, userId, userId, userId]);
        await databaseQuery(userQueries.RequestBook.update_books, [userId, bookId]);
        const ans: QueryResult = await databaseQuery(userQueries.RequestBook.issued_book, [bookId]);
        return ({ status: RES_STATUS.SUCCESS, books: ans.rows[0] });
    }
    catch (err) {
        throw err;
    }

}


/**
 * This function is to get issued books and returns issued books from database.
 * @param {User} reqUser is req.user which is an object of type User.   
 * @returns {Promise<Books>} Books is a array of objects i.e of books where each book has there specific attributes.   
*/
export const issuedBooks = async (reqUser: User): Promise<Books> => {

    try {
        if (reqUser.role == 'admin') {
            const ans: QueryResult = await databaseQuery(adminQueries.issuedBooks.books);
            if (!ans.rowCount) {
                return ({ status: RES_STATUS.NOT_FOUND, message: 'No issued books' });
            }
            return ({ status: RES_STATUS.SUCCESS, books: ans.rows });
        }
        const userId = reqUser.id//user.rows[0].id;
        const ans: QueryResult = await databaseQuery(userQueries.IssuedBooks.books, [userId]);
        if (!ans.rowCount) {
            return ({ status: RES_STATUS.NOT_FOUND, message: 'No issued books' });
        }
        return ({ status: RES_STATUS.SUCCESS, books: ans.rows });
    }
    catch (err) {
        throw err;
    }

}

/**
 * This function is to return book indatabase.
 * @param {string} bookId is a book id.
 * @param {User} reqUser is req.user which is an object of type User.   
 * @returns {Promise<Books>} Books is a array of objects i.e of books where each book has there specific attributes.   
*/
export const returnBook = async (bookName: string, reqUser: User): Promise<Books> => {

    try {
        if (reqUser.role == 'admin') {
            return ({ status: RES_STATUS.FORBIDDEN, message: 'Forbidden not allowed' });
        }
        if (!bookName) {
            return ({ status: RES_STATUS.BAD_REQUEST, message: 'Book Id required' });
        }
        let entry: string[] | null = bookName.match(regexp);
        let book_name = entry?.join(' ');
        book_name?.toString();
        const book: QueryResult = await databaseQuery(userQueries.ReturnBook.book, [book_name])
        if (!book.rowCount) {
            return ({ status: RES_STATUS.BAD_REQUEST, message: 'Book Id invalid' });
        }
        const bookId: string = book.rows[0].id
        const userId: string | undefined = reqUser.id;
        const issued: QueryResult = await databaseQuery(userQueries.ReturnBook.issued, [userId, bookId]);
        if (!issued.rowCount) {
            return ({ status: RES_STATUS.NOT_FOUND, message: 'No issued books' });
        }
        await databaseQuery(userQueries.ReturnBook.delete, [bookId, userId]);
        await databaseQuery(userQueries.ReturnBook.update, [userId, bookId]);
        const ans: QueryResult = await databaseQuery(userQueries.ReturnBook.availBooks, [bookId]);
        return ({ status: RES_STATUS.SUCCESS, book: ans.rows[0] });
    }
    catch (err) {
        throw err;
    }

}
