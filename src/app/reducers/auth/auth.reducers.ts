import {createReducer, on} from "@ngrx/store";
import {AuthState, initialAuthState} from "./auth.state";
import {AuthActions} from "./auth.actions";

export const authReducers = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, {user}): AuthState => ({...state, isAuthenticated: true, user})),
  on(AuthActions.logoutSuccess, (state): AuthState => ({...state, isAuthenticated: false, user: undefined}))
)
