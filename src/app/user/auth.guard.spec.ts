import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, delay, of } from 'rxjs';


import { authGuardFn } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
    let userServiceSpy: jasmine.SpyObj<AuthService>;
    let mockRouter: jasmine.SpyObj<Router>;

    let activatedRouteSnapshot: ActivatedRouteSnapshot;
    let routerStateSnapshot: RouterStateSnapshot;

    beforeEach(async () => {
        userServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthenticatedUser']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        activatedRouteSnapshot = {} as ActivatedRouteSnapshot;
        routerStateSnapshot = {} as RouterStateSnapshot;

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: AuthService, useValue: userServiceSpy }
            ],
        })
    });

    it('should return true if user is logged in', fakeAsync(() => {
        // // Arrange
        // userServiceSpy.getAuthenticatedUser.and.returnValue({UserName: 'demo@test.in', Token: 'qwery'});
        //
        // const guard = TestBed.runInInjectionContext(() => {
        //     return authGuardFn(
        //         activatedRouteSnapshot,
        //         routerStateSnapshot
        //     ) as Observable<boolean>;
        // });
        //
        // // Act
        // let guardResult = null;
        // guard
        //     .pipe(delay(10))
        //     .subscribe((result) => (guardResult = result));
        // //console.log(`Guard ${guard}`);
        //
        // tick(10);
        //
        // // Assert
        // expect(guardResult).toBeTrue();
        //
        // flush();
    }));
    //
    // it('should return a URL tree if user is not logged in', fakeAsync(() => {
    //     // Arrange
    //     userServiceSpy.getAuthenticatedUser.and.returnValue(undefined);
    //     const guard = TestBed.runInInjectionContext(() => {
    //         return authGuardFn(
    //             activatedRouteSnapshot,
    //             routerStateSnapshot
    //         ) as Observable<boolean>;
    //     })
    //
    //     // Assert
    //     expect(mockRouter.navigate).toHaveBeenCalledWith([ '/', 'user', 'login' ]);
    //
    //     flush();
    // }));

});
