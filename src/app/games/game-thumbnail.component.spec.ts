import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GameThumbnailComponent } from './game-thumbnail.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { Game } from './shared';
import { AppRoutingModule } from '../app-routing.module';

describe('GameThumbnailComponent', () => {
  let component: GameThumbnailComponent;
  let fixture: ComponentFixture<GameThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameThumbnailComponent ],
      imports: [BrowserModule, AppRoutingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameThumbnailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.game =  new Game(
      '84a32c31-1423-4fb3-8d3e-ae728cf860f1',
      'The Legend of Zelda: Breath of the Wild',
      'An action-adventure game set in an open world where players control Link as he travels through the kingdom of Hyrule.',
      new Date('2017-03-03'),
      59.99,
      'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    );
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call buyGame() when Buy button clicked', () => {
    // arrange
    component.game =  new Game(
      '84a32c31-1423-4fb3-8d3e-ae728cf860f1',
      'The Legend of Zelda: Breath of the Wild',
      'An action-adventure game set in an open world where players control Link as he travels through the kingdom of Hyrule.',
      new Date('2017-03-03'),
      59.99,
      'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    );
    fixture.detectChanges();
    spyOn(component, 'buyGame');
    const button = fixture.debugElement.query(By.css('button.btn'));

    // act
    button.triggerEventHandler('click', null);

    // assert
    expect(component.buyGame).toHaveBeenCalled();
  });

  
  // it('should increment clicks on button click', fakeAsync(() => {
  //   const button = fixture.nativeElement.querySelector('button');

  //   button.click();
  //   tick();
  //   button.click();
  //   tick();

  //   expect(component.timesBought).toEqual(2);
  // }));
});
