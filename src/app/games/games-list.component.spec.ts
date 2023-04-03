import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesListComponent } from './games-list.component';
import { Game, GameService } from './shared';
import { DebugElement } from '@angular/core';

describe('GamesListComponent', () => {
  let mockGameService: any;
  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;
  let debugElm: DebugElement;
  let element: HTMLElement;

  beforeEach(async () => {
    mockGameService = { getGames: () => []}
    await TestBed.configureTestingModule({
      declarations: [ GamesListComponent ],
      providers: [
        { provide: GameService, useValue: mockGameService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
    debugElm = fixture.debugElement;
    element = fixture.nativeElement;    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial display', () => {
    it('should have the correct title', () => {
      // component.games = [
      //   {}
      // ];

      // fixture.detectChanges();

      // expect(element.querySelector('[card-body]')?.textContent).toContain()
    })
  });
});
