
import request from 'supertest';
import supertest from 'supertest';
const express = require('express');
const router = require('../routes/user')
const {Pool}= require('pg')
jest.mock('../database/db');
import { databaseQuery as db } from '../database/db_queryFunction';
import { pool } from '../database/db';
import { userLogin } from '../services/logService';
const app = express();
app.use('/', router);

// beforeEach(async () => {
//     await pool.connect();
//   })
  
//   // close connection
//   afterA(async () => {
//     await pool.end()
//     jest.resetAllMocks();
//})

describe('POST /register', ()=>{
    // curl for loop for load testting

    
    it('Successful registeration', async () =>{
        //(pool as any).connect = jest.fn().mockReturnThis();
        //(pool as any).query = jest.fn().mockReturnThis();

        const response = await request(app).post("/login").send({
            password: '12224'
        });
        expect(response.status).toEqual(200);
    });

    // test('/availableBooks route', async()=>{
    //     const res = await request(app).get('/availableBooks');
    //     expect(res.status).toBe(401);
    // })


});

// beforeAll(async () => {
//     await databaseQuery("CREATE TABLE testUsers (id SERIAL PRIMARY KEY, role varchar(20), name varchar(56), email varchar(20), password varchar(40))");
//   });
  
//   beforeEach(async () => {
//     // seed with some data
//     await databaseQuery("INSERT INTO students (name) VALUES ('Elie'), ('Matt')");
//   });
  
//   afterEach(async () => {
//     await databaseQuery("DELETE FROM students");
//   });
  
//   afterAll(async () => {
//     await databaseQuery("DROP TABLE students");
//   });




// // Regex
// test('There is no I in team', ()=>{
//     expect('team').not.toMatch(/I/i);
// })

// const creat = jest.fn();
// const get= jest.fn();



// let pool: any;
//     beforeAll(async () => {
//             pool = new Pool({
//             user: 'postgres',
//             password: '1SUL5T4G',
//             database: 'Library_Management_System',
//             host: 'localhost',
//             port: 5432
//         });
//         await pool.on('connect', () => {
//             console.log(`Connected to the DB`);
//         });
//     });

    // afterAll(async () => {
    //     await pool.end();
    // });

// beforeAll(async () => {
//     await db("CREATE TABLE userstest (id SERIAL PRIMARY KEY, role varchar(20),name varchar(255), email varchar(255) unique, passcode varchar(255))");
//   });
  
//   beforeEach(async () => {
//     // seed with some data
//     await db("INSERT INTO userstest (role, name, email, passcode) VALUES ('user', 'Prathmesh gheware', 'prathmesh.gheware@afourtech.com', '12224')");
//   });
  
//   afterEach(async () => {
//     await db("DELETE FROM userstest");
//   });
  
//   afterAll(async () => {
//     await db("DROP TABLE userstest");
//   });


