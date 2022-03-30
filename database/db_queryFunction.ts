import { pool } from "./db";
import { QueryResult } from "pg";

/**
 * This function is a  database related for database related queries and returns object  
 * @param {string} Query is a query passed in service layer funstions. 
 * @param {(string | Date | undefined) []} array is an array of parameters passed in service layer functions. 
 * @returns {Promise<QueryResult>}  
*/ 
export async function databaseQuery(Query: string, array?:((string | undefined) [] )| string ): Promise<QueryResult>{
    const ans: QueryResult = await pool.query(Query, array);
    return ans;
}
