import {User} from "../../user/user.model";

export interface AuthState {
  isAuthenticated: boolean;
  user?: User;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false
}
