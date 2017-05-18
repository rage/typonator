// @flow
import type { ThunkArgument } from 'state/store';
import type { Dispatch, GetState } from 'state/reducer';

export const TIMER_DECREMENT = 'TIMER_DECREMENT';

function decrementAction() {
  return {
    type: TIMER_DECREMENT,
  };
}

export function decrement() {
  return async function decrementor(dispatch: Dispatch, getState: GetState, { api }: ThunkArgument) {
    const { timerReducer: { time } } = getState();
    dispatch(decrementAction());
    await api.fetchNewShit();

    if (time === 0) {
      try {
        await api.fetchNewShit();
      } catch (e) {
        console.warn('Could not fetch next exercise from the server.', e);
      }
    }
  };
}
