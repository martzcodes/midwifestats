import { Component, OnInit, NgZone } from '@angular/core';
import { MidwifeService } from '../../midwife.service';
import { Vanity } from '../../models/vanity';
import {Observable } from 'rxjs';

@Component({
  selector: 'app-midwife-container',
  templateUrl: './midwife-container.component.html',
  styleUrls: ['./midwife-container.component.css']
})
export class MidwifeContainerComponent implements OnInit {
  midwife: Vanity;

  constructor(private zone: NgZone, private midwifeService: MidwifeService) { }

  ngOnInit() {
    this.midwifeService.getMidwife().subscribe(midwife => {
      this.zone.run(() => {
        this.midwife = midwife;
      });
    });
  }

}
