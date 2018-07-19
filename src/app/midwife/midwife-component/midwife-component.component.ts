import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Vanity } from '../../models/vanity';

@Component({
  selector: 'app-midwife-component',
  templateUrl: './midwife-component.component.html',
  styleUrls: ['./midwife-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MidwifeComponentComponent implements OnInit {
  @Input() midwife: Vanity;

  constructor() { }

  ngOnInit() {
  }

}
