import { Game } from "./game.model";

export interface GameItem {
    id: string;
    quantity: number;
    price: number;
    game: Game;
}