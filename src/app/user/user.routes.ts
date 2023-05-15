import { authGuardFn } from "./auth.guard";
import { UserLoginComponent } from "./user-login.component";
import { UserProfileComponent } from "./user-profile.component";

export const userRoutes = [
    { path: 'profile', component: UserProfileComponent, canActivate: [authGuardFn], },
    { path: 'login', component: UserLoginComponent}
]