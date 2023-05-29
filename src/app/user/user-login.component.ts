import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {AuthState} from "../reducers/auth/auth.state";
import {Store} from "@ngrx/store";
import {AuthActions} from "../reducers/auth/auth.actions";

@Component({
    templateUrl: './user-login.component.html',
    styles:[
        `
.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}

.error{
    color: red;
}
        `]
})
export class UserLoginComponent implements OnInit{
    private userEmail!: FormControl;
    private userPassword!: FormControl;
    loginForm!: FormGroup;

    constructor(private store: Store<AuthState>, private router: Router){}

    ngOnInit(): void {
        this.userEmail = new FormControl('', [Validators.required, Validators.email])
        this.userPassword = new FormControl('', [Validators.required, Validators.minLength(8)])

        this.loginForm = new FormGroup({
            userEmail: this.userEmail,
            userPassword: this.userPassword
        })
    }

    isValidEmail(): boolean{
        return this.userEmail.valid || this.userEmail.untouched
    }

    isValidPassword(): boolean{
        return this.userPassword.valid || this.userPassword.untouched
    }

    onLogin(formValues: any){
        if(this.loginForm.valid){

            this.store.dispatch(AuthActions.login({username: formValues.userEmail, password: formValues.userPassword}));
            console.log(formValues);
            this.router.navigate(['games']);
        }
    }

    cancel(){
        this.router.navigate(['games']);
    }
}
