import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = 'https://reqres.in/api/login';

@Injectable()
export class LoginClientService{
    constructor(private http: HttpClient) { }

    post(email: string, password: string): Observable<any> {
        let options = { headers: new HttpHeaders({ 'Context-Type': 'application/json'})};

        return this.http.post<{token: string}>(API_URL, { email, password }, options);
    }
}