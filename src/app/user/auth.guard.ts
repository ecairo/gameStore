import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { of } from "rxjs";

export const authGuardFn: CanActivateFn = () => {
    const router = inject(Router);
    
    let authService = inject(AuthService);
    
    let user = authService.getAuthenticatedUser();
    
    return user === undefined ? router.navigate(['/', 'user', 'login']) : of(true);
};