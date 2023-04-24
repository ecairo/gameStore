import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UserLoginComponent } from './user-login.component';
import { AuthService } from './auth.service';
import { By } from '@angular/platform-browser';
import mockInit from './mock-auth.service.stub';
//import MockAuthService from './mock-auth.service.stub';

describe(`${UserLoginComponent.name}`, () => {
    let authServiceMock: any;
    let component: UserLoginComponent;
    let fixture: ComponentFixture<UserLoginComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(async () => {
        // authServiceMock = jasmine.createSpyObj('AuthService', ['loginUser']);
        // MockAuthService
        authServiceMock = mockInit();

        await TestBed.configureTestingModule({
            declarations: [UserLoginComponent],
            imports: [ReactiveFormsModule],
            providers: [{ provide: AuthService, useValue: authServiceMock}]
        }).compileComponents();

        fixture = TestBed.createComponent(UserLoginComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;

        fixture.detectChanges();
    });

    // afterEach(()=>{
    //     MockAuthService._reset();
    // })

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should be a loginform defined', () => {
        expect(component.loginForm).toBeDefined();
    });

    describe('when form controls exists', () => {
        it('should have email and password fields', () => {
            const emailField = component.loginForm.get('userEmail');
            const passwordField = component.loginForm.get('userPassword');

            expect(emailField).toBeDefined();
            expect(passwordField).toBeDefined();
        });

        it('should be invalid when email value is not valid', () => {
            const emailField = component.loginForm.controls['userEmail'];

            emailField.setValue('invalid-email');

            expect(emailField.valid).toBeFalsy();
        });

        it('should be valid when email value is valid', () => {
            const emailField = component.loginForm.controls['userEmail'];

            emailField.setValue('valid-email@example.com');

            expect(emailField.valid).toBeTruthy();
        });

        it('should be valid when has been invalid', () => {
            const emailField = component.loginForm.controls['userEmail'];

            emailField.setValue('invalid-email');

            expect(emailField.valid).toBeFalsy();

            emailField.setValue('valid-email@example.com');

            expect(emailField.valid).toBeTruthy();
        });

        it('should be invalid when password field is not of the required length', () => {
            const passwordField = component.loginForm.controls['userPassword'];

            passwordField.setValue('1234');

            expect(passwordField.valid).toBeFalsy();
        });

        it('should be invalid when password field is empty', () => {
            const passwordField = component.loginForm.controls['userPassword'];

            passwordField.setValue('');

            expect(passwordField.valid).toBeFalsy();
        });

        it('should valid when password field is valid', () => {
            const passwordField = component.loginForm.controls['userPassword'];

            passwordField.setValue('password123');

            expect(passwordField.valid).toBeTruthy();
        });

        it('should show message when password field is invalid', () => {
            const passwordField = component.loginForm.controls['userPassword'];

            passwordField.setValue('pass');
            fixture.detectChanges();

            expect(passwordField.valid).toBeFalsy();
            
            const onPasswordInvalid = element.querySelector('.invalidPassword');

            expect(onPasswordInvalid).toBeDefined();
        });

        it('should does not show error message when password field is valid', () => {
            const passwordField = component.loginForm.controls['userPassword'];

            passwordField.setValue('password123');
            expect(passwordField.valid).toBeTruthy();
            fixture.detectChanges();

            const onPasswordInvalid = element.querySelector('.invalidPassword');
            expect(onPasswordInvalid).toBeNull();
        });        
    });

    describe('when login button exist', () => {

        it('should login button be disabled when form is created', () => {
            const loginButton = element.querySelector('button[type="submit"]') as HTMLButtonElement;

            fixture.detectChanges();

            expect(loginButton.disabled).toBeTruthy();
        });
    
        it('should login button be enabled when form is valid', () => {
            const emailField = component.loginForm.controls['userEmail'];
            const passwordField = component.loginForm.controls['userPassword'];
            const loginButton = element.querySelector('button[type="submit"]') as HTMLButtonElement;

            emailField.setValue('valid-email@example.com');
            passwordField.setValue('password123');
            fixture.detectChanges();

            expect(loginButton.disabled).toBeFalsy();
        });

        it('should login button disabled when form is invalid', () => {
            const emailField = component.loginForm.controls['userEmail'];
            const loginButton = element.querySelector('button[type="submit"]') as HTMLButtonElement;

            emailField.setValue('invalidexample.com');
            fixture.detectChanges();

            expect(loginButton.disabled).toBeTruthy();
        });

        it('should submit form when login button is clicked and form is valid', () => {
            spyOn(component, 'onLogin');
            const emailField = component.loginForm.controls['userEmail'];
            const passwordField = component.loginForm.controls['userPassword'];
            const loginButton = element.querySelector('button[type="submit"]') as HTMLButtonElement;
            
            emailField.setValue('valid-email@example.com');
            passwordField.setValue('password123');
            fixture.detectChanges();

            loginButton.click();

            // expect(component.onLogin).toHaveBeenCalled();
            expect(component.onLogin).toHaveBeenCalledWith(
                {
                    userEmail: 'valid-email@example.com', 
                    userPassword: 'password123'
                });
        });

        it('should call loginUser of AuthService when valid', () => {
            const emailField = component.loginForm.controls['userEmail'];
            const passwordField = component.loginForm.controls['userPassword'];
            const loginButton = element.querySelector('button[type="submit"]') as HTMLButtonElement;
            
            emailField.setValue('valid-email@example.com');
            passwordField.setValue('password123');
            fixture.detectChanges();

            loginButton.click();

            //expect(authServiceMock.loginUser).toHaveBeenCalled();
            expect(authServiceMock.loginUser).toHaveBeenCalledWith('valid-email@example.com', 'password123');
        });
    })
});
