import { userLogin, userRegistration } from "../services/logService";

test('registerUser function exists', ()=>{
    expect(userLogin).toBeDefined();
    expect(userRegistration).toBeDefined();
});

test('User login', async () =>{
    expect.assertions(2);
    const username: string = 'prathmesh.gheware@gmail';
    const password: string = '1224';
    const params: number = 2;
    const data = await userLogin(username, password, params);
    expect(data.status).toBeDefined();
    expect(data.message).toEqual('User not exists');
});

test('User login', async () =>{
    expect.assertions(2);
    const body = {
        role: 'user',
        name: 'Prathmesh Gheware',
        email: 'prathmesh.gheware@gmail',
        password: '12224'
    }
    const data = await userRegistration(body);;
    expect(data.status).toBeDefined();
    expect(data.message).toEqual('Email Id invalid');
});
