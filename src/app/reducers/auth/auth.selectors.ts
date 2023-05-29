import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth.state";

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAuthenticatedUser = createSelector(selectAuthState, (state) => {
  if(!state.user) {
    throw new Error('No authenticated user');
  }
  return state.user
});
export const selectIsAuthenticated = createSelector(selectAuthState, (state) => {
  if(!state.isAuthenticated) {
    throw new Error('No authenticated user');
  }
  return state.isAuthenticated
});
