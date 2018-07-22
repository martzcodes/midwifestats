import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MidwifeActionTypes, LoadMidwife } from './midwife.actions';
import * as MidwifeActions from './midwife.actions';
import { map, tap, switchMap } from 'rxjs/operators';
import { MidwifeService } from './midwife.service';

@Injectable()
export class MidwifeEffects {
  @Effect({ dispatch: false })
  loadMidwife$ = this.actions$.pipe(
    ofType<LoadMidwife>(MidwifeActionTypes.LoadMidwife),
    map(action => action.payload),
    switchMap(vanity => {
      return this.midwifeService.getMidwife(vanity);
    }),
    map(midwife => new MidwifeActions.LoadMidwifeSuccess(midwife))
  );

  constructor(
    private actions$: Actions,
    private midwifeService: MidwifeService
  ) {}
}
