import { Injectable } from "@angular/core";
import { Observable, Subject, map } from "rxjs";
import { GameService } from "./game.service";

@Injectable()
export class SpecialGamesService {
    constructor(private gamesService: GameService) { }

    get getSpecialGames(): Observable<string> {
        return this.gamesService.getSpecialDealGames.pipe(map((game) => `Special deal ${game}`));
    }
}
