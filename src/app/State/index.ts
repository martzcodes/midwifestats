import * as fromMidwife from './midwife.reducer';
import * as fromRoot from '../reducers/index';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

// export const getSelectedMidwife = (state: MidwifeState) =>
//   state.selectedMidwife;

export interface MidwifeState {
  midwife: fromMidwife.State;
}

export interface State extends fromRoot.State {
  midwife: MidwifeState;
}

export const reducers: ActionReducerMap<MidwifeState> = {
  midwife: fromMidwife.reducer
};

export const getMidwifeState = createFeatureSelector<MidwifeState>('midwife');

export const getMidwifeEntitiesState = createSelector(
  getMidwifeState,
  state => state.midwife
);

export const getSelectedMidwifeId = createSelector(
  getMidwifeEntitiesState,
  fromMidwife.getSelectedMidwifeId
);

export const {
  selectIds: getMidwifeIds,
  selectEntities: getMidwifeEntities,
  selectAll: getAllMidwives,
  selectTotal: getTotalMidwives
} = fromMidwife.adapter.getSelectors(getMidwifeEntitiesState);

export const getSelectedMidwife = createSelector(
  getMidwifeEntities,
  getSelectedMidwifeId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

// interface MidwifeState {
//   midwife: MidwifeState;
// }

// export interface MidwifeState {
//   midwives: any;
//   selectedMidwife: string;
// }

// export const initialMidwifeState: MidwifeState = {
//   midwives: {},
//   selectedMidwife: null
// };

// export function reducer(
//   state = initialMidwifeState,
//   action: MidwifeActions
// ): MidwifeState {
//   switch (action.type) {
//     case MidwifeActionTypes.LoadMidwife:
//       return {
//         ...state,
//         selectedMidwife: action.payload
//       };
//     case MidwifeActionTypes.LoadMidwifeSuccess:
//       const newState = {
//         ...state
//       };
//       newState.midwives[action.payload.vanity] = action.payload;
//       return newState;

//     default:
//       return state;
//   }
// }

// export const getSelectedMidwife = (state: MidwifeState) =>
//   state.midwife.selectedMidwife
//     ? state.midwife.midwives[state.midwife.selectedMidwife]
//     : null;
