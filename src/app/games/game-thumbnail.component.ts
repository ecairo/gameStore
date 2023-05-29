import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/app-state';
import { ShoppingCartActions } from '../reducers/cart.actions';
import { GameItem } from './shared/game-item';
import { Game } from './shared/game.model';

@Component({
    selector: 'app-game-thumbnail',
    templateUrl: './game-thumbnail.component.html',
    styleUrls: ['./game-thumbnail.component.css']
})
export class GameThumbnailComponent implements OnInit {
    @Input() game!: Game;
    @Output() gameClick = new EventEmitter()
    timesBought = 0;

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        //console.log('Init component GameThumbnail');
    }

    buyGame() {
        this.timesBought++;

        const actionResult = `${this.game?.Name} has been bought ${this.timesBought}`;

        console.log(actionResult);

        this.gameClick.emit(actionResult);

        const newShoppingGameItem = {
            id: this.game.Id.toString(),
            quantity: 1,
            price: this.game.Price,
            game: this.game
        } as GameItem;

        this.store.dispatch(ShoppingCartActions.addGame({game: newShoppingGameItem}));
    }
}
