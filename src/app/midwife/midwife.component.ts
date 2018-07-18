import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Vanity } from '../models/vanity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-midwife',
  templateUrl: './midwife.component.html',
  styleUrls: ['./midwife.component.scss']
})
export class MidwifeComponent implements OnInit {
  midwife$: Observable<Vanity>;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.midwife$ = authService.vanity$;
  }

  ngOnInit() {
    this.authService.getVanity(this.route.snapshot.paramMap.get('vanity'));
  }
}
