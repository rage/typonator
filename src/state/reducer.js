// @flow

import { combineReducers } from 'redux';

import textReducer from 'reducers/text-reducer';
import type { State as TextState } from 'reducers/text-reducer';

/* eslint-disable no-use-before-define */
export type ThunkAction = (dispatch: Dispatch, getState: GetState, arguments: ThunkArguments) => any;
/* eslint-enable no-use-before-define */
export type Action = { type: string, payload?: any } | ThunkAction | Promise<any>;

export type State = {
  text: TextState,
}
export type Dispatch = (action: Action) => any;

export type ThunkArguments = {
};

export type GetState = () => State;

export default (model: string, template: string) => (
  combineReducers({
    text: textReducer(model, template),
  })
);
