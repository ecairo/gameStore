import { Component, OnDestroy, OnInit } from "@angular/core";
import {AuthUser, User} from "./user.model";
import { AuthService } from "./auth.service";
import {Observable, Subscription} from "rxjs";
import { ActivatedRoute } from "@angular/router";
import {Store} from "@ngrx/store";
import {selectAuthenticatedUser} from "../reducers/auth/auth.selectors";
import {AuthState} from "../reducers/auth/auth.state";

@Component({
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {

    user$: Observable<User | undefined> = this.store.select(selectAuthenticatedUser);

    constructor(private store: Store<AuthState>) { }
}
