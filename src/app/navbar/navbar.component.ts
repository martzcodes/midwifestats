import { Component, OnInit } from '@angular/core';
import { MidwifeService } from '../State/midwife.service';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  authenticated: boolean;
  userDetails$: Observable<UserDetails>;
  vanity: string;

  constructor(private midwifeService: MidwifeService) {
    this.midwifeService.user.subscribe(user => {
      this.authenticated = user !== null;
    });
    this.midwifeService.userDetails$.subscribe(userDetails => {
      if (userDetails) {
        this.vanity = userDetails.vanity;
      }
    });
  }

  ngOnInit() {}

  social(provider) {
    this.midwifeService.social(provider);
  }

  logout() {
    this.midwifeService.logout();
  }
}
