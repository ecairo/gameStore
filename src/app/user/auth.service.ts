import { Injectable } from "@angular/core";

import { LoginClientService } from "./login-client.service";
import {HttpResponse} from "@angular/common/http";
import {AuthUser} from "./user.model";
import {Observable} from "rxjs";


@Injectable()
export class AuthService {

    constructor(private apiClient: LoginClientService) { }

    loginUser(userEmail: string, password: string): Observable<HttpResponse<AuthUser>> {
        return this.apiClient.post(userEmail, password)
    }
}
