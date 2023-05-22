import { CartActionTypes, ShoppingGameAction } from "./game-product.actions";

describe('GameProduct Actions', () => {
    it('should create expected load action', () => {

        const payload = { games: [] }

        const expectedAction = ShoppingGameAction.gamesLoaded(payload);

        expect({ ...expectedAction }).toEqual({
            type: CartActionTypes.GAMES_LOADED,
            games: payload.games
        });
    });
})