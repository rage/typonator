// @flow
import { createReducer } from 'redux-create-reducer';
import { TEXT_CHANGED } from 'state/actions';
import type { TextAction } from 'state/actions';

export type State = {
  text: string,
  correct: Array<boolean>,
  model: string
}

const MODEL_TEXT = `public class Hei {

}`;

const initialState = {
  text: '',
  correct: [],
  model: MODEL_TEXT,
};

export default createReducer(initialState, {
  [TEXT_CHANGED](state: State, action: TextAction): State {
    const model = state.model;
    const answer = action.text;
    const newCorrect = [];
    const minLen = model.length < answer.length ? model.length : answer.length;
    for (let i = 0; i < minLen; i += 1) {
      newCorrect[i] = model.charAt(i) === answer.charAt(i);
    }
    if (answer.length > model.length) for (let i = model.length; i < answer.length; i += 1) newCorrect[i] = false;
    return {
      ...state,
      ...{
        text: action.text,
        correct: newCorrect,
      },
    };
  },
});
