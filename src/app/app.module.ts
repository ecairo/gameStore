import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    AppRoutingModule
  ],
  providers: [GameService, GameRouteActivator, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
