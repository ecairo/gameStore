import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() title: string = "";

  user: User | undefined;

  constructor(private authService: AuthService){
  }

  ngOnInit(): void {
    this.authService
      .getLoggerUserEvent()
        .subscribe( usr => {
          this.user = usr;
        });
    
    this.authService.isAuthenticated().subscribe(usr => {
      this.user = usr;
    })
  }
}
