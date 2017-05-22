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

function findBugs(model, answer) {
  const wrongRanges = [];
  const minLen = model.length < answer.length ? model.length : answer.length;
  let rowCount = 0;
  let colCount = 0;
  let i = 0;
  for (; i < minLen; i += 1) {
    if (answer.charAt(i) === '\r' || answer.charAt(i) === '\n') {
      rowCount += 1;
      colCount = -1;
    }
    if (model.charAt(i) !== answer.charAt(i)) {
      wrongRanges.push({
        startRow: rowCount,
        startCol: colCount,
        endRow: rowCount,
        endCol: colCount + 1,
        className: prefixer('wrong'),
        type: 'line',
      });
    }
    colCount += 1;
  }
  if (answer.length > model.length) {
    const answerRows = answer.substring(i).split('\n');
    answerRows.forEach((row) => {
      wrongRanges.push({
        startRow: rowCount,
        startCol: colCount,
        endRow: rowCount,
        endCol: colCount + row.length,
        className: prefixer('wrong'),
        type: 'line',
      });
      rowCount += 1;
      colCount = 0;
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
