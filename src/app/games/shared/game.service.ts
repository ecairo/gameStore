import { Injectable } from "@angular/core";
import { Game } from "src/app/games/shared/game.model";
import { Guid } from "src/app/common/Guid";
import { Observable, Subject, interval, map, take } from "rxjs";

@Injectable()
export class GameService {
    constructor() {
        //
    }

    getGames(): Observable<Game[]> {
        let subject = new Subject<Game[]>();
        setTimeout(() => {
            subject.next(GAMES); subject.complete();
        }, 100)
        return subject;
    }

    get getSpecialDealGames(): Observable<Game>{
        return interval(100).pipe(
            take(3),
            map((i) => GAMES[i])
        );        
    }

    getGame(id: string): Game | undefined {

        if (!Guid.isValid(id)) {
            return undefined;
        }

        return GAMES.find(game => game.Id.toString() === id);
    }
}

const GAMES: Game[] = [
    new Game(
        '84a32c31-1423-4fb3-8d3e-ae728cf860f1',
        'The Legend of Zelda: Breath of the Wild',
        'An action-adventure game set in an open world where players control Link as he travels through the kingdom of Hyrule.',
        new Date('2017-03-03'),
        59.99,
        'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ),
    new Game(
        '5b6a5a5c-0516-4d6a-a4e4-90b9c43817ab',
        'Red Dead Redemption 2',
        'A western-themed action-adventure game set in an open world where players control outlaw Arthur Morgan.',
        new Date('2018-10-26'),
        49.99,
        'https://images.pexels.com/photos/585752/pexels-photo-585752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ),
    new Game(
        '4565470c-468e-4d0c-a2f2-7e08c1d3640e',
        'The Last of Us Part II',
        'A post-apocalyptic action-adventure game where players control Ellie as she navigates a world overrun by infected humans.',
        new Date('2020-06-19'),
        59.99,
        'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ),
    new Game(
        'c7c26d1b-7287-4220-904f-7b99f3037521',
        'Super Mario Odyssey',
        'A platformer game where players control Mario as he travels to various worlds to save Princess Peach from Bowser.',
        new Date('2017-10-27'),
        59.99,
        'https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ),
    new Game(
        '9d51112c-8e84-45d6-b70c-7b44f86a8a7c',
        'Portal 2',
        'A first-person puzzle-platform game where players control a robot who must navigate through various test chambers using a handheld portal device.',
        new Date('2011-04-19'),
        9.99,
        'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    )
];