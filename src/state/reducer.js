// @flow

import Api from 'utils/api';

import { combineReducers } from 'redux';
import timerReducer from 'reducers/timer-reducer';
import type { State as TimerState } from 'reducers/timer-reducer';

/* eslint-disable no-use-before-define */
export type ThunkAction = (dispatch: Dispatch, getState: GetState, arguments: ThunkArguments) => any;
/* eslint-enable no-use-before-define */
export type Action = { type: string, payload?: any } | ThunkAction | Promise<any>;

export type State = {
  timerReducer: TimerState,
}
export type Dispatch = (action: Action) => any;

export type ThunkArguments = {
  api: Api,
};

export type GetState = () => State;

export default combineReducers({
  timerReducer,
});
