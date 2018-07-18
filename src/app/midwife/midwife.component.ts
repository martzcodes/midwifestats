import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-midwife',
  templateUrl: './midwife.component.html',
  styleUrls: ['./midwife.component.scss']
})
export class MidwifeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getVanity(this.route.snapshot.paramMap.get('vanity'));
  }
}
