// @flow
import { createReducer } from 'redux-create-reducer';
import { TEXT_CHANGED } from 'state/actions';
import type { TextAction } from 'state/actions';
import prefixer from 'utils/class-name-prefixer';

export type State = {
  text: string,
  markers: Array<Object>,
  model: string
}

const MODEL_TEXT = `public class Hei {

}`;

const initialState = {
  text: '',
  markers: [],
  model: MODEL_TEXT,
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
          className: prefixer('wrong'),
          type: 'line',
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
        className: prefixer('wrong'),
        type: 'line',
      });
      i++;
    });
  }
  return wrongRanges;
}

export default createReducer(initialState, {
  [TEXT_CHANGED](state: State, action: TextAction): State {
    const wrongRanges = findBugs(state.model, action.text);
    return {
      ...state,
      ...{
        text: action.text,
        markers: wrongRanges,
      },
    };
  },
});
