import { availableBooks, requestBook, issuedBooks, returnBook } from "../services/userService";

test('function exists', ()=>{
    expect(availableBooks).toBeDefined();
    expect(requestBook).toBeDefined();
    expect(issuedBooks).toBeDefined();
    expect(returnBook).toBeDefined();
});

test('availableBooks function', async () =>{
    expect.assertions(1);
    
    const reqUser = {
        role: 'admin'
    }
    const data = await availableBooks(reqUser);
    expect(data.status).toBeDefined();
});

test('requestBook function', async () =>{
    expect.assertions(2);
    const id: string = 'sdkasifjasiasml;';
    const params: number = 1;
    const body = {
        name: 'DSA by gheware',
        available_count: 4
    }
    const reqUser = {
        role: 'user'
    }
    const mock= jest.fn().mockResolvedValue('Book Id invalid');
    const data = await requestBook(id, params, reqUser);
    expect(data.status).toBeDefined();
    expect(data.message).toEqual('Book Id invalid');
});

test('issuedBooks function', async () =>{
    expect.assertions(2);
    const reqUser = {
        role: 'user',
        id: 'sfsadfasnckjaskjas'
    }
    const data = await issuedBooks(reqUser);
    expect(data.status).toBeDefined();
    expect(data.message).toEqual('No issued books');
});


test('returnBook function', async () =>{
    expect.assertions(1);
    const id: string = '694f0c82-1fa5-4115-8294-992bc0f3a145';
    const reqUser = {
        role: 'admin',
        id: 'c09affaf-85c1-419a-b650-70d623d0d55c'
    }
    const data = await returnBook(id, reqUser);
    expect(data.status).toBe(403);
});
