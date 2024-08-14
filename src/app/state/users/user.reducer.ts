import {createReducer, on} from '@ngrx/store';
import {User} from '../../shared/models/user.model';
import {testAction} from "./user.actions";

export interface UserState {
  users?: User[];
  total?: number;
  error?: any;
  testText?: string;
}

//
export const initialState: UserState = {
  users: [],
  total: 0,
  error: null,
  testText: 'initial'
};

export const userReducer = createReducer(
  initialState,
  on(testAction, (state, {content}) => ({
    ...state,
    testText: content
  }))
);
