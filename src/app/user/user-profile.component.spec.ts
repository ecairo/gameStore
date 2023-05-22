import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { UserProfileComponent } from './user-profile.component';

import { ActivatedRoute, Router, Routes } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe(`${UserProfileComponent.name}`, () => {
    let mockUserService: jasmine.SpyObj<AuthService>;
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;
    let activatedRoute: ActivatedRoute;
    let router: Router;

    const routes: Routes = [
        { path: 'user/profile', component: UserProfileComponent },
    ];

    beforeEach(async () => {

        mockUserService = jasmine.createSpyObj('AuthService', ['getAuthenticatedUser'], { loggedUser: of(true), });

        await TestBed.configureTestingModule({
            declarations: [UserProfileComponent],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(routes)
            ],
            providers: [
                { provide: AuthService, useValue: mockUserService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: of({}),
                            paramMap: {
                                get: (id: string) => activatedRoute.snapshot.params[id],
                            }
                        }
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        activatedRoute = TestBed.inject(ActivatedRoute);
        element = debugElement.nativeElement;
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    afterEach(() => {
        component.ngOnDestroy();
    })

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should go to user profile', fakeAsync(() => {

        router.navigate(['/user/profile']);
        tick();

        expect(component).toBeTruthy();
        flush();
    }));

});
