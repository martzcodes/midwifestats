import {
  Action,
  ActionReducerMap
} from '@ngrx/store';
import { MidwifeActions, MidwifeActionTypes } from './midwife.actions';

export interface MidwifesState {
  midwife: State;
}

export interface State {
  midwives: any;
  selectedMidwife: string | null;
}

export const initialState: State = {
  midwives: {},
  selectedMidwife: null
};

export function reducer(state = initialState, action: MidwifeActions): State {
  switch (action.type) {
    case MidwifeActionTypes.LoadMidwife:
      return {
        ...state,
        selectedMidwife: action.payload
      };
    case MidwifeActionTypes.LoadMidwifeSuccess:
      const newState = {
        ...state
      };
      newState.midwives[action.payload.vanity] = action.payload;
      return newState;

    default: {
      return state;
    }
  }
}

export const getSelectedMidwifeId = (state: State) => state.selectedMidwife;
export const getSelectedMidwife = (state: MidwifesState) =>
  state.midwife.selectedMidwife ? state.midwife.midwives[state.midwife.selectedMidwife] : null;
