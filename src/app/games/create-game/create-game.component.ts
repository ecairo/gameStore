import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html'
})
export class CreateGameComponent {
  constructor(private route: Router){}

  cancel(){
    this.route.navigate(['/games']);
  }
}
