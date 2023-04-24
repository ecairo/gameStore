import { Injectable } from "@angular/core";

import { User } from "./user.model";
import { Guid } from "../common/Guid";
import { LoginClientService } from "./login-client.service";


@Injectable()
export class AuthService {
    loggedUser!: User;

    constructor(private apiClient: LoginClientService) { }

    loginUser(userEmail: string, password: string) {

        this.apiClient.post(userEmail, password)
            .subscribe(
                response => {
                    if(response.status == 200){
                        this.loggedUser = {
                            Id: new Guid("ba434a19-4e5d-49d6-98e0-43ff2b76482d"),
                            FirstName: 'John',
                            LastName: 'Snow',
                            UserName: 'Aegon',
                            Token: response.body['token']
                        }
                    }

                    console.log(response.body);
                });
    }

    isAuthenticated() {
        return !!this.loggedUser;
    }
}