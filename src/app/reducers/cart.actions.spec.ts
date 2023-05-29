import { CartActionTypes, ShoppingCartActions } from "./cart.actions";

describe('GameProduct Actions', () => {
    it('should create expected load action', () => {

        const payload = { games: [] }

        const expectedAction = ShoppingCartActions.gamesLoaded(payload);

        expect({ ...expectedAction }).toEqual({
            type: CartActionTypes.GAMES_LOADED,
            games: payload.games
        });
    });
})