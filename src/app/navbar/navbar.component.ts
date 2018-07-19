import { Component, OnInit } from '@angular/core';
import { MidwifeService } from '../midwife.service';
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
  constructor(private midwifeService: MidwifeService) {
    this.midwifeService.user.subscribe(user => {
      this.authenticated = user !== null;
    });
    this.userDetails$ = this.midwifeService.userDetails$;
  }

  ngOnInit() {}

  social(provider) {
    this.midwifeService.social(provider);
  }

  logout() {
    this.midwifeService.logout();
  }
}
