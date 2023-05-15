import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigInterceptor } from './config.interceptor';
import { LoginClientService } from './user/login-client.service';
import { delay } from 'rxjs';

describe('ConfigInterceptor', () => {

    let loginClientAPIService: LoginClientService;
    let httpTestingController: HttpTestingController;

    const API_URL = 'https://reqres.in/api';
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                LoginClientService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ConfigInterceptor,
                    multi: true
                }
            ]
        });

        loginClientAPIService = TestBed.inject(LoginClientService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    })

    it('should add content headers in http headers', fakeAsync(() => {
        let resp: any;        


        loginClientAPIService.get('2')
            .pipe(delay(10))
            .subscribe((response) => resp = response);
            
        const testRequest = httpTestingController.expectOne(`${API_URL}/users/2`);
        testRequest.flush({
            "data": {
                "id": 2,
                "email": "janet.weaver@reqres.in",
                "first_name": "Janet",
                "last_name": "Weaver",
                "avatar": "https://reqres.in/img/faces/2-image.jpg"
            },
            "support": {
                "url": "https://reqres.in/#support-heading",
                "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
            }
        });
        tick(10);

        // Assert
        expect(testRequest.request.headers.get('Content-Type')).toBe('application/json');

        flush();
    }));
});
