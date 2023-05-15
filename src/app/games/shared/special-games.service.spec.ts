import { hot, cold } from 'jasmine-marbles'
import { TestScheduler } from 'rxjs/testing'

import { SpecialGamesService } from './special-games.service'

describe('SpecialGamesService', () => {
    let sut: SpecialGamesService
    let gameService: any

    beforeEach(() => {

        gameService = jasmine.createSpy('GameService')
        gameService.getSpecialDealGames = hot('^-a-b-c', {
            a: 'Zelda',
            b: 'COD',
            c: 'RDR2',
        })

        sut = new SpecialGamesService(gameService)
    })

    it('should correctly return special deal games', () => {

        const expectedObservable = cold('--a-b-c', {
            a: 'Special deal Zelda',
            b: 'Special deal COD',
            c: 'Special deal RDR2',
        });


        expect(sut.getSpecialGames).toBeObservable(expectedObservable)
    });

    it('should return special deal games', () => {
        const scheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })

        scheduler.run((helpers) => {
            const { expectObservable } = helpers

            const coldObservable = scheduler.createHotObservable('^-a-b-c', {
                a: 'Zelda',
                b: 'COD',
                c: 'RDR2',
            });

            gameService.getSpecialDealGames = coldObservable;
            sut = new SpecialGamesService(gameService);

            const expectedMarble = '--a-b-c'
            const expectedVales = {
                a: 'Special deal Zelda',
                b: 'Special deal COD',
                c: 'Special deal RDR2',
            }

            expectObservable(sut.getSpecialGames).toBe(expectedMarble, expectedVales)
        })
    })
})