import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import {map, of} from "rxjs";
import {AuthState} from "../reducers/auth/auth.state";
import {Store} from "@ngrx/store";
import {selectAuthenticatedUser, selectIsAuthenticated} from "../reducers/auth/auth.selectors";
import {catchError} from "rxjs/operators";

export const authGuardFn: CanActivateFn = () => {
    const router = inject(Router);

    let store = inject(Store<AuthState>);

    let user$ = store.select(selectIsAuthenticated)
    return user$.pipe(catchError(() => router.navigate(['/', 'user', 'login'])))
};
