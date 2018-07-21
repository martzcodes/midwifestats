import {
  Action,
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MidwifeActions, MidwifeActionTypes } from './midwife.actions';
import { Midwife } from '../models/midwife';
import * as fromRoot from '../reducers';

export interface State extends EntityState<Midwife> {
  selectedMidwife: string | null;
}

export const adapter: EntityAdapter<Midwife> = createEntityAdapter<Midwife>({
  selectId: (midwife: Midwife) => midwife.vanity,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedMidwife: null
});

export function reducer(state = initialState, action: MidwifeActions): State {
  switch (action.type) {
    case MidwifeActionTypes.LoadMidwife:
      return {
        ...state,
        selectedMidwife: action.payload
      };
    case MidwifeActionTypes.LoadMidwifeSuccess:
      return adapter.upsertOne(action.payload, state);

    default: {
      return state;
    }
  }
}

export const getSelectedMidwifeId = (state: State) => state.selectedMidwife;
