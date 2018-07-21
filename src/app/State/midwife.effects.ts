import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MidwifeActionTypes, LoadMidwife } from './midwife.actions';
import * as MidwifeActions from './midwife.actions';
import { map, switchMap, tap } from 'rxjs/operators';
import { MidwifeService } from './midwife.service';

@Injectable()
export class MidwifeEffects {
  @Effect({ dispatch: false })
  effect$ = this.actions$.pipe(
    ofType<LoadMidwife>(MidwifeActionTypes.LoadMidwife),
    map(action => action.payload),
    tap(vanity => {
      this.midwifeService.getMidwife(vanity);
    })
  );

  @Effect() update$ = this.actions$.ofType(MidwifeActionTypes.UpdateMidwife);

  constructor(
    private actions$: Actions,
    private midwifeService: MidwifeService
  ) {}
}
