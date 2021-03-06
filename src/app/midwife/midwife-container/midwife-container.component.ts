import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectionStrategy
} from '@angular/core';
import { MidwifeService } from '../../State/midwife.service';
import { Midwife } from '../../models/midwife';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromMidwife from '../../State/midwife.reducer';
import * as MidwifeActions from '../../State/midwife.actions';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    private store: Store<fromMidwife.MidwifesState>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.store.dispatch(new MidwifeActions.LoadMidwife(params.get('vanity')));
    });
    this.midwife$ = this.store.pipe(
      select(fromMidwife.getSelectedMidwife),
      filter(midwife => {
        return midwife;
      })
    );
  }
}
