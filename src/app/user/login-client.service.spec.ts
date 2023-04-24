import { Observable, map } from "rxjs";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";

import { AuthService } from "./auth.service";
import { cold } from "jasmine-marbles";
import { LoginClientService } from "./login-client.service";

describe('LoginClientService', () => {
    let loginClientAPIService: LoginClientService;
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
        providers: [ LoginClientService ],
      });
    
      loginClientAPIService = TestBed.inject(LoginClientService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });
    
    afterEach(() => {
        // Verificamos que no hay llamadas sin mock en espera
        httpTestingController.verify();
    });

    describe('when call login method', () => {
        it('should return the mocked response', () => {
            // arrange
            loginClientAPIService.post('useremail@host.com', 'password1234')
                .subscribe((response: any) => {
                    // assert
                    expect(response.body).toEqual(MOCK_200_RESPONSE.body);
                });
            
            // Prueba que la URL ha sido invocada
            const testRequest = httpTestingController.expectOne(API_URL);            
            // expect(testRequest.request.body).toEqual(MOCK_200_RESPONSE.body);

            // act            
            testRequest.flush(MOCK_200_RESPONSE);

            // assert
            expect(testRequest.request.method).toEqual('POST');            
        })

        it('should return error response', () => {
            // arrange
            loginClientAPIService.post('useremail@host.com', '')
                .subscribe((response: any) => {
                    // assert
                    expect(response.body).toEqual(MOCK_400_RESPONSE.body);
                });
            
            // Prueba que la URL ha sido invocada
            const testRequest = httpTestingController.expectOne(API_URL);            

            // act            
            testRequest.flush(MOCK_400_RESPONSE);

            // assert
            expect(testRequest.request.method).toEqual('POST');
        })

        
        // it('should multiply by "2" each value emitted', () => {
        //     const values = { a: 1, b: 2, c: 3, x: 2, y: 4, z: 6};
        //     const source = cold('-a-b-c-|', values);
        //     const expected = cold('-x-y-z-|', values);
        //     const result = source.pipe(map(x => x*2));
        //     expect(result).toBeObservable(expected);
        //   });

        // it('should return the mocked response', inject(
        //     [AuthService, HttpTestingController], 
        //     (service: AuthService, controller: HttpTestingController) => {
        //         service.loginUser('useremail@host.com', 'password1234')
        //             .subscribe((response: any) => {
        //                 expect(response).toEqual(MOCK_200_RESPONSE.body);
        //         });
        
        //         const testRequest = controller.expectOne(API_URL);
        //         expect(testRequest.request.method).toEqual('POST');
        //         testRequest.flush(MOCK_200_RESPONSE);
        //     }))
    })
});