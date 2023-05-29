import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { User } from '../user/user.model';
import {Observable, Subscription} from 'rxjs';
import { OnDestroy } from '@angular/core';
import {AuthState} from "../reducers/auth/auth.state";
import {Store} from "@ngrx/store";
import {selectAuthenticatedUser} from "../reducers/auth/auth.selectors";
import {AuthActions} from "../reducers/auth/auth.actions";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    @Input() title: string = "";

    user$: Observable<User | undefined> = this.store.select(selectAuthenticatedUser);

    constructor(private store: Store<AuthState>) { }


    logout() {
      this.store.dispatch(AuthActions.logout())
    }
}
