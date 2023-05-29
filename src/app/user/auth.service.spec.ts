import { delay } from "rxjs";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, fakeAsync, flush, tick } from "@angular/core/testing";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

import { AuthService } from "./auth.service";
import { LoginClientService } from "./login-client.service";
import { AuthUser, User } from "./user.model";

describe('AuthService', () => {
    let authService: AuthService;
    let loginService: LoginClientService;
    let httpTestingController: HttpTestingController;
    const API_URL = 'https://reqres.in/api/login';

    const MOCK_200_RESPONSE: HttpResponse<AuthUser> = new HttpResponse({
        status: 200,
        body: {
            token: 'QpwL5tke4Pnpja7X4'
        },
    });

    const MOCK_400_RESPONSE: HttpErrorResponse = new HttpErrorResponse({
        status: 400,
        error: 'Missing password'
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService, LoginClientService],
        });

        authService = TestBed.inject(AuthService);
        loginService = TestBed.inject(LoginClientService)
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // Verificamos que no hay llamadas sin mock en espera
        httpTestingController.verify();

        localStorage.clear();
    });

    describe('when call loginUser method', () => {
        it('should authenticate the user', fakeAsync(() => {
            // // Arrange
            // const expectedUser: User = {
            //     UserName: 'useremail@host.com',
            //     Token: 'QpwL5tke4Pnpja7X4'
            // };
            // let authenticatedResult: any = undefined;
            // authService.loggedUser.subscribe((result) => {
            //     if(result){
            //         authenticatedResult = authService.getAuthenticatedUser()
            //     }
            // });
            //
            // // Act
            // authService.loginUser('useremail@host.com', 'password1234');
            // const testRequest = httpTestingController.expectOne(API_URL);
            // testRequest.flush(MOCK_200_RESPONSE);
            //
            // // Assert
            // tick(10);
            // expect(expectedUser).toEqual(authenticatedResult);
            // flush();
        }))
        //
        // it('should user be undefined', fakeAsync(() => {
        //
        //     authService.loginUser('useremail@host.com', 'password1234');
        //
        //     // Prueba que la URL ha sido invocada
        //     const testRequest = httpTestingController.expectOne(API_URL);
        //
        //     // act
        //     testRequest.flush(MOCK_400_RESPONSE);
        //     let authenticatedResult: any;
        //     authService.loggedUser
        //         .pipe(delay(10))
        //         .subscribe((result) => (authenticatedResult = result));
        //     tick(10);
        //
        //     // Assert
        //     expect(authenticatedResult).toBeUndefined();
        //
        //     flush();
        // }));
    })
});
