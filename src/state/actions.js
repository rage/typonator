// @flow
import type { ThunkArgument } from 'state/store';
import type { Dispatch, GetState } from 'state/reducer';

export const TIMER_DECREMENT = 'TIMER_DECREMENT';
export const TEXT_CHANGED = 'TEXT_CHANGED';

function decrementAction() {
  return {
    type: TIMER_DECREMENT,
  };
}

export function textAction(text: string) {
  return {
    text,
    type: TEXT_CHANGED,
  };
}

export type TextAction = {
  text: string,
  type: string
}

export function decrement() {
  return async function decrementor(dispatch: Dispatch, getState: GetState, { api }: ThunkArgument) {
    dispatch(decrementAction());
    await api.fetchNewShit();
  };
}
