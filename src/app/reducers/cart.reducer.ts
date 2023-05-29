import { createReducer, on } from '@ngrx/store';
import { ShoppingCartActions } from './cart.actions';
import { GamesStore } from './app-state';

export const initialState: GamesStore = { gameItems: [], selectedGame: undefined };

export const gameShoppingReducer = createReducer(
    initialState,
    on(ShoppingCartActions.gamesLoaded, (state, {games}) => ({...state, gameItems: games})),
    on(ShoppingCartActions.addGame, (state, {game}) => ({...state, gameItems: [...state.gameItems, game] })),
    on(ShoppingCartActions.deleteGame, (state, {id}) => ({...state, gameItems: state.gameItems.filter(gm => gm.id != id)}))
)