import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { By } from '@angular/platform-browser';
// import MockAuthService from './mock-auth.service.stub';
import { UserProfileComponent } from './user-profile.component';
import mockInit from './mock-auth.service.stub';

describe(`${UserProfileComponent.name}`, () => {
    let authServiceMock: any;
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(async () => {

        authServiceMock = mockInit();
        
        await TestBed.configureTestingModule({
            declarations: [UserProfileComponent],
            imports: [ReactiveFormsModule],
            providers: [{ provide: AuthService, useValue: authServiceMock }]
        }).compileComponents();

        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should had been already called (dummy)', () => {

        authServiceMock.loginUser({
            userEmail: 'valid-email@example.com', 
            userPassword: 'password123'
        });

        expect(authServiceMock.loginUser).toHaveBeenCalledWith(
            {
                userEmail: 'valid-email@example.com', 
                userPassword: 'password123'
            });
    });

});
