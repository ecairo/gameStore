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
        userServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
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
        // Arrange
        userServiceSpy.isAuthenticated.and.returnValue(of(true));

        const guard = TestBed.runInInjectionContext(() => {
            return authGuardFn(
                activatedRouteSnapshot,
                routerStateSnapshot
            ) as Observable<boolean>;
        });

        // Act
        let guardResult = null;
        guard
            .pipe(delay(10))
            .subscribe((result) => (guardResult = result));

        tick(10);

        // Assert
        expect(guardResult).toBeTrue();

        flush();
    }));

    it('should return a URL tree if user is not logged in', fakeAsync(() => {
        // Arrange
        userServiceSpy.isAuthenticated.and.returnValue(of(false));
        const guard = TestBed.runInInjectionContext(() => {
            return authGuardFn(
                activatedRouteSnapshot,
                routerStateSnapshot
            ) as Observable<boolean>;
        })

        // Act
        let guardResult = null;
        guard
            .pipe(delay(10))
            .subscribe((result) => (guardResult = result));

        tick(10);

        // Assert
        expect(guardResult).toBeFalse();
        expect(mockRouter.navigate).toHaveBeenCalledWith([ '/', 'user', 'login' ]);

        flush();
    }));

});