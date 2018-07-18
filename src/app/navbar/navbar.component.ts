import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from '../../../node_modules/rxjs';
import { UserDetails } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  authenticated: boolean;
  userDetails$: Observable<UserDetails>;
  constructor(private authService: AuthService) {
    this.authService.user.subscribe(user => {
      this.authenticated = user !== null;
    });
    this.userDetails$ = this.authService.userDetails$;
  }

  ngOnInit() {}

  social(provider) {
    this.authService.social(provider);
  }

  logout() {
    this.authService.logout();
  }
}
