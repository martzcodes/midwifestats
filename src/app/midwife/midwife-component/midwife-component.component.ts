import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Midwife } from '../../models/midwife';

@Component({
  selector: 'app-midwife-component',
  templateUrl: './midwife-component.component.html',
  styleUrls: ['./midwife-component.component.css']
})
export class MidwifeComponentComponent implements OnInit {
  @Input() midwife: Midwife;

  constructor() {}

  ngOnInit() {}
}
