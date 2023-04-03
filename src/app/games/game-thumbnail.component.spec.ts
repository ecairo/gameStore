import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GameThumbnailComponent } from './game-thumbnail.component';

describe('GameThumbnailComponent', () => {
  let component: GameThumbnailComponent;
  let fixture: ComponentFixture<GameThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should increment clicks on button click', fakeAsync(() => {
    const button = fixture.nativeElement.querySelector('button');

    button.click();
    tick();
    button.click();
    tick();

    expect(component.timesBought).toEqual(2);
  }));
});
