import { Component } from "@angular/core";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {


    user: User | undefined;

    constructor(private authService: AuthService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.user = this.authService.getUser(this.route.snapshot.params['id']);
    }
}