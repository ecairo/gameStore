import { Injectable } from "@angular/core";

import { User } from "./user.model";

import { LoginClientService } from "./login-client.service";
import { Subject } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable()
export class AuthService {

    private user: User | undefined;

    loggedUser = new Subject<boolean>();

    constructor(private apiClient: LoginClientService) { }

    loginUser(userEmail: string, password: string) {

        this.apiClient
            .post(userEmail, password)
            // .pipe(
            //     catchError(catchError((error: any, caught: Observable<any>): Observable<any> => {
            //         console.error('API error ', error);
            //         this.logoutUser();
            //         return of(undefined);
            //     }))
            // )
            .subscribe(
                (response: any) => {
                    if (response.status === 200 || response.token) {
                        this.user = {
                            UserName: userEmail,
                            Token: response.body ? response.body?.token : response.token
                        };

                        this.loggedUser.next(true);
                        localStorage.setItem("user", JSON.stringify(this.user));
                    }

                    console.log(response);
                });
    }

    private handleError(error: HttpErrorResponse) {
        // handle error from backend
    }

    logoutUser() {
        if (this.isAuthenticated()) {
            this.user = undefined;
            localStorage.removeItem("user");
            this.loggedUser.next(false);
        }
    }

    isAuthenticated() {
        return this.user != undefined;
    }

    getAuthenticatedUser(): User | undefined {

        if (this.isAuthenticated()) {
            return this.user;
        }

        let storedUser = localStorage.getItem("user");
        if (storedUser !== null) {
            this.user = JSON.parse(storedUser);
        }

        return this.user;
    }
}