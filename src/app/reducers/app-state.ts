import { GameItem } from "../games/shared/game-item";

export interface AppState {
    readonly gameShopping: GamesStore;
}

export interface GamesStore {
    gameItems: ReadonlyArray<GameItem>;
    selectedGame?: GameItem;
}