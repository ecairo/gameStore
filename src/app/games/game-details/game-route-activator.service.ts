import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { GameService } from "../shared/game.service";

@Injectable()
export class GameRouteActivator implements CanActivate{
    constructor(private gameService: GameService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const gameExist = !!this.gameService.getGame(route.params['id']);

        if(!gameExist){
            this.router.navigate(['/404'])
        }

        return gameExist;
    }
}