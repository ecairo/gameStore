import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {User} from "../../user/user.model";

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ username: string, password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: Error }>(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps()
  }
  }
)
