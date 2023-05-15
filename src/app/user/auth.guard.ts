import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { tap } from "rxjs";

export const authGuardFn: CanActivateFn = () => {
    const router = inject(Router);
    
    return inject(AuthService)
        .isAuthenticated()
        .pipe(
            tap((isAuth) => isAuth 
            ? true 
            : router.navigate(['/', 'user', 'login'])
            )
        );
};