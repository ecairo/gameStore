import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GameService } from './shared/game.service';
import { Game } from './shared/game.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',  
})
export class GamesListComponent implements OnInit, OnChanges {
  @Input()  filterBy!: string;
  @Input()  sortBy!: string;
  games!: Game[]
  visibleGames: Game[] = [];

  constructor(private gameService: GameService){}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.games){
      this.filterGames(this.filterBy);
      // this.sortBy === 'name' 
      // ? this.visibleGames.sort(sortByNameAsc) 
      // : this.visibleGames.sort(sortByPriceDesc)
    }
  }
  
  ngOnInit(){
    this.gameService.getGames().subscribe(data => {
      this.games = data;
      this.games[3].setOnSale = 9.99;
    });
  }

  handleBuyGameClicked(arg0: any) {
    console.log(`Received event: ${arg0}`);
  }

  filterGames(name: string){
    return this.games.filter(gm => gm.Name.search(name) > -1);
  }

  private filterOnSaleGames(games: Game[]): Game[] {
    return games.filter(game => game.onSale === true);
  }
  
}
