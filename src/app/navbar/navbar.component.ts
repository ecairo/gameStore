import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { User } from '../user/user.model';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    @Input() title: string = "";

    user: User | undefined;
    userSubscription: Subscription;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.user = this.authService.getAuthenticatedUser();
        this.userSubscription = this.authService.loggedUser.subscribe(authStatus => {

            this.user = this.authService.getAuthenticatedUser();
        });
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    logout() {
        this.authService.logoutUser();
    }
}
