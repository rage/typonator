// @flow
import { createReducer } from 'redux-create-reducer';
import { TEXT_CHANGED } from 'state/actions';
import type { TextAction } from 'state/actions';

export type State = {
  text: string,
  markers: Array<Object>,
  model: string,
  correct: boolean
}

const MODEL_TEXT = `public class Hei {

}`;

const initialState = {
  text: '',
  markers: [],
  model: MODEL_TEXT,
  correct: false,
};

function findBugs(model: string, answer: string) {
  const wrongRanges = [];
  const modelByRow = model.split('\n');
  const answerByRow = answer.split('\n');
  let i = 0;
  for (; i < answerByRow.length; i++) {
    const row = answerByRow[i];
    const modelRow = modelByRow[i];
    if (modelRow === undefined) {
      break;
    }
    for (let j = 0; j < row.length; j += 1) {
      if (row.charAt(j) !== modelRow.charAt(j)) {
        wrongRanges.push({
          startRow: i,
          startCol: j,
          endRow: i,
          endCol: j + 1,
        });
      }
    }
  }
  if (answer.length > model.length) {
    const answerRows = answerByRow.slice(i);
    answerRows.forEach((row) => {
      wrongRanges.push({
        startRow: i,
        startCol: 0,
        endRow: i,
        endCol: row.length,
      });
      i++;
    });
  }
  return wrongRanges;
}

function isCorrect(model: string, answer: string) {
  return model.localeCompare(answer) === 0;
}

export default createReducer(initialState, {
  [TEXT_CHANGED](state: State, action: TextAction): State {
    const wrongRanges = findBugs(state.model, action.text);
    const correct = isCorrect(state.model, action.text);
    return {
      ...state,
      ...{
        text: action.text,
        markers: wrongRanges,
        correct,
      },
    };
  },
});
