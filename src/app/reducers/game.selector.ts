import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GamesStore } from "./app-state";

const gamesStore = createFeatureSelector<GamesStore>('gamesStore');

const gameItems = createSelector(gamesStore, (gamesStoreState => gamesStoreState.gameItems));

const selectedGame = createSelector(gamesStore, (gamesStoreState => gamesStoreState.selectedGame));


export const Selector = {
    gamesStore, gameItems, selectedGame
}
