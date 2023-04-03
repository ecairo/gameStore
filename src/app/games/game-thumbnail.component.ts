import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from './shared/game.model';

@Component({
  selector: 'app-game-thumbnail',
  templateUrl: './game-thumbnail.component.html',
  styleUrls: ['./game-thumbnail.component.css']
})
export class GameThumbnailComponent {
  @Input() game!: Game;
  @Output() gameClick = new EventEmitter()
  timesBought = 0;

  buyGame() {
      this.timesBought++;
      const actionResult = `${this.game?.Name} has been bought ${this.timesBought}`;
      
      console.log(actionResult);
      
      this.gameClick.emit(actionResult);
    }    
}
