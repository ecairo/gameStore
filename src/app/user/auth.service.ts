import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Guid } from "../common/Guid";

@Injectable()
export class AuthService{
    loggedUser!: User;

    loginUser(userEmail: string, password: string){
        this.loggedUser = {
            Id: new Guid("ba434a19-4e5d-49d6-98e0-43ff2b76482d"),
            FirstName: 'John',
            LastName: 'Snow',
            UserName: 'Aegon'
        }
    }

    isAuthenticated(){
        return !!this.loggedUser;
    }
}