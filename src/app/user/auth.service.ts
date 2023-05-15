import { EventEmitter, Injectable, Output } from "@angular/core";

import { AuthUser, User } from "./user.model";
import { Guid } from "../common/Guid";
import { LoginClientService } from "./login-client.service";
import { Observable, catchError, of, tap } from "rxjs";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";


@Injectable()
export class AuthService {
    @Output() loggedUser: EventEmitter<any> = new EventEmitter<any>();

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
                        let user = {
                            //Id: new Guid('ba434a19-4e5d-49d6-98e0-43ff2b76482d'),
                            FirstName: 'John',
                            LastName: 'Snow',
                            UserName: 'Aegon',
                            Token: response.body ? response.body?.token : response.token
                        };

                        localStorage.setItem("loggedUser", JSON.stringify(user));

                        this.loggedUser.emit(user);
                        console.log(user);
                    }

                    console.log(response);
                });
    }

    private handleError(error: HttpErrorResponse) {
        // handle error from backend
    }

    logoutUser() {
        if (localStorage.getItem("loggedUser")) {
            localStorage.removeItem("loggedUser");
        }
    }

    isAuthenticated() {
        let storedUser = localStorage.getItem("loggedUser");

        if (storedUser) {
            return of(JSON.parse(storedUser)).pipe(
                tap((v) => console.log(v))
            );
        }

        return of(undefined);
    }

    getLoggerUserEvent() {
        return this.loggedUser;
    }

    getUser(arg0: any) {
        let storedUser = localStorage.getItem("loggedUser");
        if (storedUser) {
            return JSON.parse(storedUser);
        }

        return undefined;
    }
}