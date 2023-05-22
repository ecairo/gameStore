import { createReducer, on } from '@ngrx/store';
import { ShoppingGameAction } from './game-product.actions';
import { GamesStore } from './app-state';

export const initialState: GamesStore = { gameItems: [], selectedGame: undefined };

export const gameShoppingReducer = createReducer(
    initialState,
    on(ShoppingGameAction.gamesLoaded, (state, {games}) => ({...state, gameItems: games})),
    on(ShoppingGameAction.addGame, (state, {game}) => ({...state, gameItems: [...state.gameItems, game] })),
    on(ShoppingGameAction.deleteGame, (state, {id}) => ({...state, gameItems: state.gameItems.filter(gm => gm.id != id)}))
)