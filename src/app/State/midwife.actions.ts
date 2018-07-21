import { Action } from '@ngrx/store';
import { Midwife } from '../models/midwife';

export enum MidwifeActionTypes {
  LoadMidwife = '[Midwife] Load Midwife',
  LoadMidwifeSuccess = '[Midwife] Load Midwife Success',
  UpdateMidwife = '[Midwife] Update Midwife',
  UpdateMidwifeSuccess = '[Midwife] Update Midwife Success'
}

export class LoadMidwife implements Action {
  readonly type = MidwifeActionTypes.LoadMidwife;
  constructor(public payload: string) {}
}

export class LoadMidwifeSuccess implements Action {
  readonly type = MidwifeActionTypes.LoadMidwifeSuccess;

  constructor(public payload: Midwife) {}
}

export class UpdateMidwife implements Action {
  readonly type = MidwifeActionTypes.UpdateMidwife;
  constructor(public payload: Midwife) {}
}

export class UpdateMidwifeSuccess implements Action {
  readonly type = MidwifeActionTypes.UpdateMidwifeSuccess;
  constructor(public payload: Midwife) {}
}

export type MidwifeActions =
  | LoadMidwife
  | LoadMidwifeSuccess
  | UpdateMidwife
  | UpdateMidwifeSuccess;
