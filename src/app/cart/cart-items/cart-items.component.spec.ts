import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { CartItemsComponent } from './cart-items.component';
import { AppState, GamesStore } from 'src/app/reducers/app-state';
import { GameItem } from 'src/app/games/shared/game-item';
import { Game } from 'src/app/games';

describe('CartItemsComponent', () => {
    let component: CartItemsComponent;
    let fixture: ComponentFixture<CartItemsComponent>;
    let store: MockStore<AppState>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CartItemsComponent],
            providers: [provideMockStore()],
        })
        .compileComponents();

        fixture = TestBed.createComponent(CartItemsComponent);
        store = TestBed.inject(MockStore);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch addGame when Buy button clicked', () => {
        // arrange
        let game = new Game(
            '84a32c31-1423-4fb3-8d3e-ae728cf860f1',
            'The Legend of Zelda: Breath of the Wild',
            'An action-adventure game set in an open world where players control Link as he travels through the kingdom of Hyrule.',
            new Date('2017-03-03'),
            59.99,
            'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        );
        const newShoppingGameItem = {
            id: game.Id.toString(),
            quantity: 1,
            price: game.Price,
            game: game
        } as GameItem;

        const initialState: GamesStore = { gameItems: [newShoppingGameItem], selectedGame: undefined };
       
        // Act
        store.setState({gameShopping: initialState});
        fixture.detectChanges();
        let gameItems = fixture.nativeElement.querySelector('#gameItems');

        // Assert
        expect(gameItems.childNodes.length).toBe(1);
    });
});
