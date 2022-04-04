import nock from "nock";
import request from 'supertest';
import * as logServices from '../services/logService';
import * as userServices from '../services/userService';
import * as adminServices from '../services/adminService';


jest.spyOn(logServices, 'userLogin').mockResolvedValue({ status: 200, user: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJp' } });
jest.spyOn(userServices, 'availableBooks').mockResolvedValue({status: 200,  books: [
  {
    "name": "DSA by Gheware",
    "available_count": 5
  },
  {
    "name": "The Monk who sold his Ferrari",
    "available_count": 1
  }
]});
jest.spyOn(adminServices, 'getStudents').mockResolvedValue({status: 200, users: [
  {
    "username": "adssafasf",
    "name": "Prathmesh Gheware"
  },
  {
    "username": "asfsdfsd",
    "name": "Krishna Poul"
  }
]})

test('login route', async()=>{
  const responseData = {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJp'
  }
  const username = 'prat@gmail.com';
  const password = '12224';
  const params = 2;
  nock('http://localhost:8080').post('/login').reply(200, responseData)
  const res = await logServices.userLogin(username, password, params);
  expect(res.status).toEqual(200);
});



test('Available Book route', async () => {
  const responseData = [
    {
      "name": "DSA by Gheware",
      "available_count": 5
    },
    {
      "name": "The Monk who sold his Ferrari",
      "available_count": 1
    }
  ]
  nock('http://localhost:8080').get('/availableBooks').reply(200, responseData);
  let user = {
    role: 'user'
  }
  const res = await userServices.availableBooks(user);
  expect(res.books).toEqual(responseData);
});


test('get Books route', async () => {
  const responseData = [
    {
      "username": "adssafasf",
      "name": "Prathmesh Gheware"
    },
    {
      "username": "asfsdfsd",
      "name": "Krishna Poul"
    }
  ]
  nock('http://localhost:8080').get('/getStudentsByBookName/The monk who sold ferrari').reply(200, responseData);
  let user = {
    role: 'admin'
  }
  const res = await adminServices.getStudents('The monk who sold ferrari', user);
  expect(res.users).toEqual(responseData);
});
