import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectionStrategy
} from '@angular/core';
import { MidwifeService } from '../../State/midwife.service';
import { Midwife } from '../../models/midwife';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromMidwife from '../../State';
import * as MidwifeActions from '../../State/midwife.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-midwife-container',
  templateUrl: './midwife-container.component.html',
  styleUrls: ['./midwife-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MidwifeContainerComponent implements OnInit {
  midwife$: Observable<Midwife>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromMidwife.State>
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new MidwifeActions.LoadMidwife(this.route.snapshot.paramMap.get('vanity'))
    );
    this.midwife$ = this.store.select(fromMidwife.getSelectedMidwife);
  }
}
