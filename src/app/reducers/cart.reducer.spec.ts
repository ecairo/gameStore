import * as fromReducer from './cart.reducer';
import { Action } from "@ngrx/store";
import { ShoppingCartActions } from "./cart.actions";
import { Game } from '../games/shared/game.model';
import { GamesStore } from './app-state';

describe(`${fromReducer.gameShoppingReducer.name}`, () => {

    const { initialState, gameShoppingReducer } = fromReducer;
    const gameTest = { id: '1', quantity: 1, price: 43, game: new Game('id', 'Demo', 'Description', new Date(), 43, 'd') };

    it('should return initial state if the action is unknown', () => {
        const action: Action = { type: 'Unknown' };
        const state = gameShoppingReducer(initialState, action);
        expect(state).toBe(initialState);
    });

    describe('AddGame action', function () {
        it('should have 1 game in gameItems after add 1 game', () => {

            const action = ShoppingCartActions.addGame({game: gameTest});

            const state = gameShoppingReducer(initialState, action);

            expect(state.gameItems.length).toEqual(1);
            expect(state.gameItems[0]).toBe(gameTest);
        });

        it('should have 2 game in gameItems after add 2 game', () => {

            const action1 = ShoppingCartActions.addGame({game: gameTest});

            let state = gameShoppingReducer(initialState, action1);

            const action2 = ShoppingCartActions.addGame({game: gameTest});

            state = gameShoppingReducer(state, action2);

            expect(state.gameItems.length).toEqual(2);
        });
    });

    describe('DeleteGame action', function () {
        it('should have 0 games in gameItems after remove 1 game', () => {

            const includedState: GamesStore = { gameItems: [gameTest], selectedGame: undefined };

            const action = ShoppingCartActions.deleteGame({id: gameTest.id});

            const state = gameShoppingReducer(includedState, action);
            
            expect(state.gameItems.length).toEqual(0);
        });
    });
});