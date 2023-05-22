import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AuthService } from '../user/auth.service';
import { of } from 'rxjs';

// describe('NavbarComponent', () => {
//     let authServiceMock: any;
//     let component: NavbarComponent;
//     let fixture: ComponentFixture<NavbarComponent>;

//     beforeEach(async () => {
//         authServiceMock = jasmine.createSpyObj('AuthService', ['getLoggerUserEvent', 'isAuthenticated']);

//         await TestBed.configureTestingModule({
//             declarations: [NavbarComponent],
//             providers: [{ provide: AuthService, useValue: authServiceMock}]
//         })
//         .compileComponents();

//         fixture = TestBed.createComponent(NavbarComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {

//         // let user = {
//         //     FirstName: "John",
//         //     LastName: "Snow",
//         //     Token: "QpwL5tke4Pnpja7X4",
//         //     UserName: "Aegon"
//         // }

        
//         authServiceMock.isAuthenticated.and.returnValue(of(true));

//         expect(component).toBeTruthy();
//     });
// });
