import { type } from "os"
type status = {
    SUCCESS: number,
    BAD_REQUEST: number,
    NOT_AUTHORIZED: number,
    FORBIDDEN: number,
    NOT_FOUND: number,
    SERVER_ERROR: number
}

interface addBook {
    lib_id: string;
    addBook: string;
    book: string;
}

interface availBook {
    availBooks: string;
}

interface raiseBook {
    user: string;
    user_mapped: string;
    get_available: string;
    add_maping: string;
    update_books: string;
    issued_books: string;
}

interface userQueries {
    [key: string]: addBook | availBook | raiseBook;
}

export const RES_STATUS: status = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
}

export const regexp = /[a-z0-9]+/gi;

export const regexpLogger = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
