import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

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

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    GameThumbnailComponent,
    GameDetailsComponent,
    CreateGameComponent,
    NavbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [GameService, GameRouteActivator, AuthService, LoginClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
