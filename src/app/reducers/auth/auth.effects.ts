import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AuthState} from "./auth.state";
import {Actions} from "@ngrx/effects";
import {createEffect, ofType} from "@ngrx/effects";
import {AuthActions} from "./auth.actions";
import {AuthService} from "../../user/auth.service";
import {map, of, switchMap} from "rxjs";
import {User} from "../../user/user.model";
import {TypedAction} from "@ngrx/store/src/models";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthEffects {
  constructor(private store: Store<AuthState>, private actions$: Actions, private auth: AuthService) {
  }

  loginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap(({username, password}) =>
      this.auth.loginUser(username, password)
        .pipe(
          map((response) => ({response, username}))
        )
    ),
    map<any, User>(({response, username}) => {
      if(!response.body.token) {
        throw new Error("No user found");
      }
      return { Token: response.body.token, UserName: username };
    }),
    map<User, TypedAction<any>>((user) => AuthActions.loginSuccess({user})),
    catchError((error) => of(AuthActions.loginFailure({error})))
  ));
}
