import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUser } from "./user.model";


const API_URL = 'https://reqres.in/api';

@Injectable()
export class LoginClientService {
    constructor(private http: HttpClient) { }

    post(email: string, password: string): Observable<HttpResponse<AuthUser>> {
        let options = {
            headers: new HttpHeaders({ 'Context-Type': 'application/json' }),
        };

        let data = {
            "email": email,
            "password": password
        }

        return this.http.post<HttpResponse<AuthUser>>(API_URL + '/login', data, options);
    }

    get(userId: string): Observable<any> {
        return this.http.get(API_URL + '/users/' + userId);
    }
}