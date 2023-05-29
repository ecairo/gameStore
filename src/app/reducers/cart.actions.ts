import { createAction, props } from '@ngrx/store';
import { GameItem } from '../games/shared/game-item';


export enum CartActionTypes {
    GAMES_LOADED = '[CART] Games Loaded',
    ADD_GAME = '[CART] Add Game',
    DELETE_GAME = '[CART] Delete Game',
}

const gamesLoaded = createAction(CartActionTypes.GAMES_LOADED, props<{ games: ReadonlyArray<GameItem> }>());

const addGame = createAction(CartActionTypes.ADD_GAME, props<{ game: GameItem }>());

const deleteGame = createAction(CartActionTypes.DELETE_GAME, props<{ id: string }>());

export const ShoppingCartActions = {
    addGame, deleteGame, gamesLoaded
}