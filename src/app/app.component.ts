import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameItem } from './games/shared/game-item';
import { AppState } from './reducers/app-state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'Game Store';

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
    }
}
