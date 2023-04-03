import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    templateUrl: './user-login.component.html',
    styles:[
        `
.error{
    color: red;
}
        `]
})
export class UserLoginComponent implements OnInit{
    private userEmail!: FormControl;
    private userPassword!: FormControl;
    loginForm!: FormGroup;

    constructor(private authService: AuthService, private router: Router){}

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

    login(formValues: any){
        if(this.loginForm.valid){
            this.authService.loginUser(formValues.userEmail, formValues.userPassword);
            console.log(formValues);
            this.router.navigate(['games']);
        }
    }

    cancel(){
        this.router.navigate(['games']);
    }
}