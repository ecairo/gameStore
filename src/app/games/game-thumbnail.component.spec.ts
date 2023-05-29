import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    flush,
    tick,
} from '@angular/core/testing';

import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { GameThumbnailComponent } from './game-thumbnail.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { Game } from './shared';
import { AppRoutingModule } from '../app-routing.module';
import { AppState } from '../reducers/app-state';
import { GameItem } from './shared/game-item';
import {ShoppingCartActions} from "../reducers/cart.actions";

describe('GameThumbnailComponent', () => {
    let component: GameThumbnailComponent;
    let fixture: ComponentFixture<GameThumbnailComponent>;
    let store: MockStore<AppState>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GameThumbnailComponent],
            providers: [provideMockStore()],
            imports: [BrowserModule, AppRoutingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(GameThumbnailComponent);
        store = TestBed.inject(MockStore);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.game = new Game(
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

    it('should call ngOnInit on component creation', () => {
        let thumbnailFixture = TestBed.createComponent(GameThumbnailComponent)
        let thumbnailComponent = thumbnailFixture.componentInstance;

        thumbnailComponent.game = new Game(
            '84a32c31-1423-4fb3-8d3e-ae728cf860f1',
            'The Legend of Zelda: Breath of the Wild',
            'An action-adventure game set in an open world where players control Link as he travels through the kingdom of Hyrule.',
            new Date('2017-03-03'),
            59.99,
            'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        );
        spyOn(thumbnailComponent, 'ngOnInit');

        // act
        thumbnailComponent.ngOnInit();

        expect(thumbnailComponent.ngOnInit).toHaveBeenCalled();
    });

    describe('when selling a game', () => {
        it('should call buyGame() when Buy button clicked', () => {
            // arrange
            component.game = new Game(
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

        it('should dispatch addGame when Buy button clicked', () => {
            // arrange
            component.game = new Game(
                '84a32c31-1423-4fb3-8d3e-ae728cf860f1',
                'The Legend of Zelda: Breath of the Wild',
                'An action-adventure game set in an open world where players control Link as he travels through the kingdom of Hyrule.',
                new Date('2017-03-03'),
                59.99,
                'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            );
            fixture.detectChanges();
            const newShoppingGameItem = {
                id: component.game.Id.toString(),
                quantity: 1,
                price: component.game.Price,
                game: component.game
            } as GameItem;
            spyOn(store, 'dispatch');

            component.buyGame();

            expect(store.dispatch).toHaveBeenCalledOnceWith(ShoppingCartActions.addGame({game: newShoppingGameItem}));
        });

        it('should increment clicks on button click', fakeAsync(() => {
            // arrange
            component.game = new Game(
                '84a32c31-1423-4fb3-8d3e-ae728cf860f1',
                'The Legend of Zelda: Breath of the Wild',
                'An action-adventure game set in an open world where players control Link as he travels through the kingdom of Hyrule.',
                new Date('2017-03-03'),
                59.99,
                'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            );
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');

            // act
            tick();
            button.click();
            tick();
            button.click();

            // assert
            expect(component.timesBought).toEqual(2);

            flush();
        }));
    });

    describe('when render a game for sale', () => {
        it('should not render .onSale when game is not on sale', () => {
            // arrange
            component.game = new Game(
                '84a32c31-1423-4fb3-8d3e-ae728cf860f1',
                'The Legend of Zelda: Breath of the Wild',
                'An action-adventure game set in an open world where players control Link as he travels through the kingdom of Hyrule.',
                new Date('2017-03-03'),
                59.99,
                'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            );
            fixture.detectChanges();

            // act
            const onSaleElement = fixture.debugElement.query(By.css('.onSale'));

            // assert
            expect(onSaleElement).toBeNull();
        });

        it('should render .onSale when game is on sale', () => {
            // arrange
            component.game = new Game(
                '84a32c31-1423-4fb3-8d3e-ae728cf860f1',
                'The Legend of Zelda: Breath of the Wild',
                'An action-adventure game set in an open world where players control Link as he travels through the kingdom of Hyrule.',
                new Date('2017-03-03'),
                59.99,
                'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            );
            fixture.detectChanges();

            // act
            component.game.setOnSale = 19.99;
            fixture.detectChanges();
            const onSaleElement = fixture.debugElement.query(By.css('.text-danger'));

            // assert
            expect(onSaleElement.nativeElement.textContent).toBe('€19.99');
        });

        it('should apply the correct styles to the game price', () => {
            // arrange
            component.game = new Game(
                '84a32c31-1423-4fb3-8d3e-ae728cf860f1',
                'The Legend of Zelda: Breath of the Wild',
                'An action-adventure game set in an open world where players control Link as he travels through the kingdom of Hyrule.',
                new Date('2017-03-03'),
                59.99,
                'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            );
            fixture.detectChanges();

            // act
            component.game.setOnSale = 19.99;
            fixture.detectChanges();
            const gamePrice = fixture.nativeElement.querySelector('.text-danger');

            // expect(gamePrice).toBeTruthy();
            // expect(getComputedStyle(gamePrice).color).toBe('rgb(255, 255, 255)');
            // expect(getComputedStyle(gamePrice).fontSize).toBe('32px');

            expect(getComputedStyle(gamePrice).fontWeight).toBe('700');
        });
    });
});
