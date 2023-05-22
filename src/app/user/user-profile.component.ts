import { Component, OnDestroy, OnInit } from "@angular/core";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {

    user: User | undefined;
    userSubscription: Subscription;

    constructor(private authService: AuthService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.user = this.authService.getAuthenticatedUser();
        this.userSubscription = this.authService.loggedUser.subscribe(authStatus => {
            this.user = this.authService.getAuthenticatedUser();
        });
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }    
}