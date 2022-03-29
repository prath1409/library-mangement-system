import { addBook, getStudents, getIssuedBooks } from "../services/adminService";



test('function exists', ()=>{
    expect(addBook).toBeDefined();
    expect(getStudents).toBeDefined();
    expect(getIssuedBooks).toBeDefined();
});

test('addBook function', async () =>{
    expect.assertions(2);
    
    const body = {
        name: 'DSA by gheware',
        available_count: 4
    }
    const reqUser = {
        role: 'admin'
    }
    const data = await addBook(body,reqUser);
    expect(data.status).toBeDefined();
    //expect(data.message).toEqual('Forbidden not allowed');
    expect(data.book?.name).toEqual('DSA by Gheware');
});


test('getStudents function', async () =>{
    expect.assertions(2);
    
    const id = 'asgdasjashsakas';
    const reqUser = {
        role: 'admin'
    }
    const data = await getStudents(id,reqUser);
    expect(data.status).toBeDefined();
    expect(data.message).toEqual('Book not exists');
});


test('getIssuedBooks function', async () =>{
    expect.assertions(2);
    
    const id = 'asgdasjashsakas';
    const reqUser = {
        role: 'admin'
    }
    const data = await getIssuedBooks(id,reqUser);
    expect(data.status).toBeDefined();
    expect(data.message).toEqual('User not exists');
});