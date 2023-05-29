import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './errors/page-not-found.component';

import {
    GamesListComponent,
    GameThumbnailComponent,
    GameService,
    GameDetailsComponent,
    CreateGameComponent,
    GameRouteActivator
} from './games/index'
import { AuthService } from './user/auth.service';
import { LoginClientService } from './user/login-client.service';
import { ErrorInterceptor } from './errors.interceptor';
import { ConfigInterceptor } from './config.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { StoreModule } from '@ngrx/store';
import { gameShoppingReducer } from './reducers/cart.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
    declarations: [
        AppComponent,
        GamesListComponent,
        GameThumbnailComponent,
        GameDetailsComponent,
        CreateGameComponent,
        NavbarComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        StoreModule.forRoot({
            gameShopping: gameShoppingReducer
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ],
    providers: [
        GameService,
        GameRouteActivator,
        AuthService,
        LoginClientService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ConfigInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
