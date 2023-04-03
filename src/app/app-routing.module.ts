import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './errors/page-not-found.component';

import { 
  GamesListComponent,
  GameDetailsComponent,
  CreateGameComponent,
  GameRouteActivator,
} from './games/index';

const routes: Routes = [
  { path: 'games/new', component: CreateGameComponent},
  { path: 'games', component: GamesListComponent},
  { path: 'games/:id', component: GameDetailsComponent, canActivate: [GameRouteActivator]},
  { path: '404', component: PageNotFoundComponent},
  { path: '', redirectTo: '/games', pathMatch: 'full'},
  { 
    path: 'user',
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
