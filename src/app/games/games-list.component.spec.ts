import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesListComponent } from './games-list.component';
import { Game, GameService } from './shared';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { GameThumbnailComponent } from './game-thumbnail.component';
import { AppRoutingModule } from '../app-routing.module';
import { of } from 'rxjs';

describe(`${GamesListComponent.name}`, () => {
  let mockGameService: any;
  let gameListComponent: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;
  let debugElm: DebugElement;
  let element: HTMLElement;

  function getDefaultGamesList(){
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

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj('GameService', ['getGames']);

    await TestBed.configureTestingModule({
      declarations: [GamesListComponent, GameThumbnailComponent],
      imports: [BrowserModule, AppRoutingModule],
      providers: [{ provide: GameService, useValue: mockGameService }],
    }).compileComponents();

    fixture = TestBed.createComponent(GamesListComponent);

    // mockGameService.getGames.and.returnValue(of(GAMES))    
    
    debugElm = fixture.debugElement;
    element = fixture.nativeElement;
  });

  it('should be created', () => {

    // arrange
    const gamesList = getDefaultGamesList();
    mockGameService.getGames.and.returnValue(of(gamesList));

    // act
    gameListComponent = fixture.componentInstance;

    // assert
    expect(gameListComponent).toBeTruthy();
  });

  describe('when listing games', () => {
    it('should set the game list correctly', () => {
      // Arrange
      const gamesList = getDefaultGamesList();
      mockGameService.getGames.and.returnValue(of(gamesList));
      gameListComponent = fixture.componentInstance;
     
      // Act
      fixture.detectChanges();

      // Assert
      const thumbnailComponents = debugElm.queryAll(
        By.directive(GameThumbnailComponent)
      );
      expect(thumbnailComponents.length).toBe(gamesList.length);
    });

    it('should set the game correctly on each thumbnail', () => {
      // Arrange
      const gamesList = getDefaultGamesList();
      mockGameService.getGames.and.returnValue(of(gamesList));
      gameListComponent = fixture.componentInstance;

      // Act
      fixture.detectChanges();
      const thumbnailComponents = debugElm.queryAll(
        By.directive(GameThumbnailComponent)
      );

      // Assert
      thumbnailComponents.forEach((thumbnailComponent, index) => {
        expect(thumbnailComponent.componentInstance.game).toBe(
          gamesList[index]
        );

        expect(thumbnailComponent.query(By.css('h2'))?.nativeElement.textContent).toBe(gamesList[index].Name);
      });
    });

    it('should have the correct title', () => {
      // Arrange
      const gamesList = getDefaultGamesList();
      mockGameService.getGames.and.returnValue(of(gamesList));
      gameListComponent = fixture.componentInstance;

      // Act
      fixture.detectChanges();
      const thumbnailComponents = debugElm.queryAll(
        By.directive(GameThumbnailComponent)
      );

      // Assert
      thumbnailComponents.forEach((thumbnailComponent, index) => {
        expect(thumbnailComponent.query(By.css('h2'))?.nativeElement.textContent).toBe(gamesList[index].Name);
      });
    });
  });
});
