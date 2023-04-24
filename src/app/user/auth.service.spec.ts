import { Observable, map } from "rxjs";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";

import { AuthService } from "./auth.service";
import { LoginClientService } from "./login-client.service";
import { Guid } from "../common/Guid";

describe('AuthService', () => {
    let authService: AuthService;
    let loginService: LoginClientService;
    let httpTestingController: HttpTestingController;
    const API_URL = 'https://reqres.in/api/login';

    const MOCK_200_RESPONSE: HttpResponse<any> = new HttpResponse({
        status: 200,
        body: {
          token: 'QpwL5tke4Pnpja7X4'
        },
      });

    const MOCK_400_RESPONSE: HttpResponse<any> = new HttpResponse({
        status: 400,
        body: {
          error: 'Missing password'
        },
      });     
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ AuthService, LoginClientService ],
      });
    
      authService = TestBed.inject(AuthService);
      loginService = TestBed.inject(LoginClientService)
      httpTestingController = TestBed.inject(HttpTestingController);
    });
    
    afterEach(() => {
        // Verificamos que no hay llamadas sin mock en espera
        httpTestingController.verify();
    });

    describe('when call loginUser method', () => {
        it('should authenticate the user', () => {

            authService.loginUser('useremail@host.com', 'password1234');

            // Prueba que la URL ha sido invocada
            const testRequest = httpTestingController.expectOne(API_URL);

            // act            
            testRequest.flush(MOCK_200_RESPONSE);            

            // assert
            expect(authService.loggedUser).toEqual({
                Id: new Guid("ba434a19-4e5d-49d6-98e0-43ff2b76482d"),
                FirstName: 'John',
                LastName: 'Snow',
                UserName: 'Aegon',
                Token: 'QpwL5tke4Pnpja7X4'
            })
        })

        it('should user be undefined', () => {

            authService.loginUser('useremail@host.com', 'password1234');

            // Prueba que la URL ha sido invocada
            const testRequest = httpTestingController.expectOne(API_URL);

            // act            
            testRequest.flush(MOCK_400_RESPONSE);            

            // assert
            expect(authService.loggedUser).toBeUndefined();
        })        
    })
});