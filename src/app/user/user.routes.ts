import { UserLoginComponent } from "./user-login.component";
import { UserProfileComponent } from "./user-profile.component";

export const userRoutes = [
    { path: 'profile', component: UserProfileComponent },
    { path: 'login', component: UserLoginComponent}
]