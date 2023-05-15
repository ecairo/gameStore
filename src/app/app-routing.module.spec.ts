import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Game, GameDetailsComponent, GameRouteActivator, GameService, GamesListComponent } from './games';
import { of } from 'rxjs';


function getDefaultGamesList() {
    return [
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
            'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ),
    ];
}

describe('AppRouting', () => {
    let mockGameService: jasmine.SpyObj<GameService>;
    let component: GameDetailsComponent;
    let fixture: ComponentFixture<GameDetailsComponent>;
    let activatedRoute: ActivatedRoute;
    let router: Router;

    const testRoutes = [
        { id: '5b6a5a5c-0516-4d6a-a4e4-90b9c43817ab', expectedGameId: '5b6a5a5c-0516-4d6a-a4e4-90b9c43817ab', expectedGameTitle: 'Game 123' },
    ];

    const routes: Routes = [
        { path: 'games', component: GamesListComponent},
        { path: 'games/:id', component: GameDetailsComponent, canActivate: [GameRouteActivator]},
        { path: '', redirectTo: '/games', pathMatch: 'full'},
      ];

    beforeEach(async () => {
        mockGameService = jasmine.createSpyObj('GameService', ['getGame']);

        await TestBed.configureTestingModule({
            declarations: [GameDetailsComponent],
            imports: [RouterTestingModule.withRoutes(routes)],
            providers: [
                { provide: GameService, useValue: mockGameService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: of({ }),
                            paramMap: {
                                get: (id: string) => activatedRoute.snapshot.params[id],
                            }
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GameDetailsComponent);
        component = fixture.componentInstance;
        activatedRoute = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
    });

    it('should get the gameId from the route parameters', () => {
        const gamesList = getDefaultGamesList();
        mockGameService.getGame.and.returnValue(gamesList[1]);
        const gameRoute = testRoutes[0];

        activatedRoute.snapshot.params['id'] = gameRoute.id;
        fixture.detectChanges();

        expect(component.game?.Id.toString()).toBe(gameRoute.expectedGameId);
    });

    it('should go to games', fakeAsync(() =>{

        router.navigate(['/']);
        tick();

        expect(router.url).toBe('/games');
    }));
});