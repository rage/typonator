// @flow
import { createReducer } from 'redux-create-reducer';
import { TIMER_DECREMENT } from 'state/actions';

export type State = {
  time: number,
}

const initialState = {
  time: 10,
};

export default createReducer(initialState, {
  [TIMER_DECREMENT](state: State): State {
    const time = state.time > 0 ? state.time - 1 : initialState.time;
    return { ...state, ...{ time } };
  },
});
