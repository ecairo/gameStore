import { Component, OnInit } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Guid } from 'src/app/common/Guid';
import { Game } from 'src/app/games/shared/game.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html'
})
export class GameDetailsComponent implements OnInit {

  game: Game | undefined;

  constructor(private gameService: GameService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.game = this.gameService.getGame(this.route.snapshot.params['id']);
  }
}
