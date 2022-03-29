import exp from "constants";
import 'jest';
import { isExportDeclaration, textSpanContainsPosition } from "typescript";
import { registerUser, userLogger, setBooks,getAvailBooks,requestBook,getIssuedBooks,returnIssuedBook,getStudentData,
    getBooksData} from "../controllers/userController";

test('registerUser function exists', ()=>{
    expect(registerUser).toBeDefined();
    expect(userLogger).toBeDefined();
    expect(setBooks).toBeDefined();
    expect(getAvailBooks).toBeDefined();
    expect(requestBook).toBeDefined();
    expect(getIssuedBooks).toBeDefined();
    expect(returnIssuedBook).toBeDefined();
    expect(getStudentData).toBeDefined();
})

// // Regex
// test('There is no I in team', ()=>{
//     expect('team').not.toMatch(/I/i);
// })