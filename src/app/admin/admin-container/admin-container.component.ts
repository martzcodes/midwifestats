import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Midwife } from '../../models/midwife';
import { Store } from '@ngrx/store';
import * as MidwifeActions from '../../State/midwife.actions';
import * as fromMidwife from '../../State/midwife.reducer';
import { MidwifeService } from '../../State/midwife.service';
import { UserDetails } from '../../models/user';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnInit {
  midwife$: Observable<Midwife>;
  userDetails$: Observable<UserDetails>;

  constructor(
    private store: Store<fromMidwife.MidwifesState>,
    private midwifeService: MidwifeService
  ) {}

  ngOnInit() {
    this.userDetails$ = this.midwifeService.userDetails$;
    this.userDetails$
      .pipe(filter(userDetails => userDetails !== null))
      .subscribe(userDetails => {
        if (userDetails.vanity) {
          this.store.dispatch(
            new MidwifeActions.LoadMidwife(userDetails.vanity)
          );
          this.midwife$ = this.store.select(fromMidwife.getSelectedMidwife);
        }
      });
  }

  saveVanity(vanity) {
    this.midwifeService.setVanity(vanity);
  }

  saveMidwife(midwife) {
    this.midwifeService.saveMidwife(midwife);
  }
}
