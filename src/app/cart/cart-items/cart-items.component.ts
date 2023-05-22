import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameItem } from 'src/app/games/shared/game-item';

import { AppState, GamesStore } from 'src/app/reducers/app-state';

@Component({
    selector: 'app-cart-items',
    templateUrl: './cart-items.component.html',
    styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

    gamesStoreShopping$: Observable<ReadonlyArray<GameItem>>;

    constructor(private store: Store<AppState>){}

    ngOnInit(): void {
        this.gamesStoreShopping$ = this.store.select(store => store.gameShopping.gameItems);
    }
}
