import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { userRoutes } from './user.routes';
import { UserProfileComponent } from "./user-profile.component";
import { UserLoginComponent } from "./user-login.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoutes)
    ],
    declarations: [
        UserProfileComponent,
        UserLoginComponent
    ],
    providers: [

    ]
})
export class UserModule {

}