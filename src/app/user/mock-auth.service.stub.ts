import { of } from "rxjs";
import { Guid } from "../common/Guid";

// export class MockAuthService{

//     loginUser(userEmail: string, password: string){
//         return {
//             UserName: userEmail
//         }
//     }

//     isAuthenticated(){
//         return of(true);
//     }
// }

// ------------
// let MockAuthService = jasmine.createSpyObj('AuthService', ['loginUser', 'isAuthenticated']);

// MockAuthService.loginUser.and.returnValue({
//     Id: new Guid("ba434a19-4e5d-49d6-98e0-43ff2b76482d"),
//     FirstName: 'John',
//     LastName: 'Snow',
//     UserName: 'john@email.com'
// });

// MockAuthService.loginUser.withArgs('john@email.com', 'password123').and.returnValue(of({
//     Id: new Guid("ba434a19-4e5d-49d6-98e0-43ff2b76482d"),
//     FirstName: 'John',
//     LastName: 'Snow',
//     UserName: 'john@email.com'
// }));

// MockAuthService.isAuthenticated.and.returnValue(of(true)),

//     MockAuthService._reset = () => {
//         MockAuthService.loginUser.calls.reset();
//         MockAuthService.isAuthenticated.calls.reset();
//     };

// export default MockAuthService;

export default function mockInit(){

    const mock = jasmine.createSpyObj('AuthService', ['loginUser', 'isAuthenticated']);

    mock.loginUser.and.returnValue({
        Id: new Guid("ba434a19-4e5d-49d6-98e0-43ff2b76482d"),
        FirstName: 'John',
        LastName: 'Snow',
        UserName: 'john@email.com'
    });

    mock.loginUser.withArgs('john@email.com', 'password123').and.returnValue(of({
        Id: new Guid("ba434a19-4e5d-49d6-98e0-43ff2b76482d"),
        FirstName: 'John',
        LastName: 'Snow',
        UserName: 'john@email.com'
    }));

    mock.isAuthenticated.and.returnValue(of(true));

    return mock;
}