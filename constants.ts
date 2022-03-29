import { type } from "os"
type status = {
    SUCCESS: number,
    BADREQUEST: number,
    UN_ATHURIZED: number,
    NOT_ATHURIZED: number,
    NOTFOUND: number
}

interface addBook {
    lib_id: string;
    addBook: string;
    book: string;
}

interface availBook  {
    availBooks: string;
}

interface raiseBook  {
    user: string;
    user_mapped: string;
    get_available: string;
    add_maping: string;
    update_books: string;
    issued_books: string;
}

interface userqueries {
    [key: string]: addBook | availBook | raiseBook;
  }

  export const RES_STATUS: status = {
    SUCCESS: 200,
    BADREQUEST: 400,
    UN_ATHURIZED: 401,
    NOT_ATHURIZED: 403,
    NOTFOUND: 404
}
/**
 * This functions returns all the Shipments/Loads for
 * BluJay client for given offset Value.
 * @param {Logger} log
 * @param {AxiosRequestHeaders} headers
 * @param {ClientConfig} clientConfig
 * @param {number} offsetValue - offset for pagination
 * @returns {Promise<Loads[]>}
 */


















































//  "/removeBook/{bookId}": {
//     "delete": {
//         "security": [
//             {
//                 "bearerAuth": []
//             }
//         ],
//         "tags": [
//             "Library Management API"
//         ],
//         "summary": "Returning the book",
//         "parameters": [
//             {
//                 "in": "path",
//                 "name": "bookId",
//                 "required": true,
//                 "schema": {
//                     "type": "string",
//                     "required": true,
//                     "decription": "The book id"
//                 }
//             }
//         ],
//         "responses": {
//             "200": {
//                 "description": "Sucessful return of book",
//                 "content": {
//                     "application/json": {
//                         "schema": {
//                             "$ref": "#/components/schemas/ResponseBody_ReturnBook"
//                         }
//                     }
//                 }
//             },
//             "400": {
//                 "description": "Bad Request",
//                 "content": {
//                     "application/json": {
//                         "schema": {
//                             "$ref": "#/components/schemas/ResponseBody_Message"
//                         }
//                     }
//                 }
//             },
//             "401": {
//                 "description": "Invalid Authorization",
//                 "content": {
//                     "application/json": {
//                         "schema": {
//                             "$ref": "#/components/schemas/ResponseBody_Message"
//                         }
//                     }
//                 }
//             },
//             "403": {
//                 "description": "Forbidden",
//                 "content": {
//                     "application/json": {
//                         "schema": {
//                             "$ref": "#/components/schemas/ResponseBody_Message"
//                         }
//                     }
//                 }
//             },
//             "404": {
//                 "description": "Not Found",
//                 "content": {
//                     "application/json": {
//                         "schema": {
//                             "$ref": "#/components/schemas/ResponseBody_Message"
//                         }
//                     }
//                 }
//             },
//             "500": {
//                 "description": "Internal server error",
//                 "content": {
//                     "application/json": {
//                         "schema": {
//                             "$ref": "#/components/schemas/ResponseBody_Message"
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }