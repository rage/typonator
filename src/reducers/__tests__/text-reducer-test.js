import test from 'ava';
import reducers from 'state/reducer';
import { TEXT_CHANGED } from 'state/actions';

// let state;
// state = reducers({ timerReducer: { time: 10 } }, { type: TIMER_DECREMENT });

test('Incorrect answer does not produce correct results', (t) => {
  const state = reducers(
    { textReducer: { text: 'Hell', markers: [], model: 'Hello', correct: false } },
    { text: 'Hella', type: TEXT_CHANGED });
  t.false(state.textReducer.correct);
  t.false(state.textReducer.markers.length === 0);
  t.deepEqual(state.textReducer.markers[0].endCol, 5);
  t.deepEqual(state.textReducer.markers[0].startCol, 4);
  t.deepEqual(state.textReducer.markers[0].endRow, 0);
  t.deepEqual(state.textReducer.markers[0].startRow, 0);
});

test('Correct answer does produce correct results', (t) => {
  const state = reducers(
    { textReducer: { text: 'Hell', markers: [], model: 'Hello', correct: false } },
    { text: 'Hello', type: TEXT_CHANGED });
  t.true(state.textReducer.correct);
  t.true(state.textReducer.markers.length === 0);
});

test('All bugs in the first row are shown as markers', (t) => {
  const state = reducers(
    { textReducer: { text: 'Hell', markers: [], model: 'Hello', correct: false } },
    { text: 'Yella', type: TEXT_CHANGED });
  t.deepEqual(state.textReducer.markers[0].endCol, 1);
  t.deepEqual(state.textReducer.markers[0].startCol, 0);
  t.deepEqual(state.textReducer.markers[0].endRow, 0);
  t.deepEqual(state.textReducer.markers[0].startRow, 0);
  t.deepEqual(state.textReducer.markers[1].endCol, 5);
  t.deepEqual(state.textReducer.markers[1].startCol, 4);
  t.deepEqual(state.textReducer.markers[1].endRow, 0);
  t.deepEqual(state.textReducer.markers[1].startRow, 0);
});

test('All bugs are shown as markers when not in the same row', (t) => {
  const state = reducers(
    { textReducer: { text: 'Hell', markers: [], model: 'Hello\nworld', correct: false } },
    { text: 'Yella\nworlt', type: TEXT_CHANGED });
  t.deepEqual(state.textReducer.markers[0].endCol, 1);
  t.deepEqual(state.textReducer.markers[0].startCol, 0);
  t.deepEqual(state.textReducer.markers[0].endRow, 0);
  t.deepEqual(state.textReducer.markers[0].startRow, 0);
  t.deepEqual(state.textReducer.markers[1].endCol, 5);
  t.deepEqual(state.textReducer.markers[1].startCol, 4);
  t.deepEqual(state.textReducer.markers[1].endRow, 0);
  t.deepEqual(state.textReducer.markers[1].startRow, 0);
  t.deepEqual(state.textReducer.markers[2].endCol, 5);
  t.deepEqual(state.textReducer.markers[2].startCol, 4);
  t.deepEqual(state.textReducer.markers[2].endRow, 1);
  t.deepEqual(state.textReducer.markers[2].startRow, 1);
});

test('Extra characters at the end of an otherwise correct answer are shown as markers', (t) => {
  const state = reducers(
    { textReducer: { text: 'Hell', markers: [], model: 'Hello\nworld', correct: false } },
    { text: 'Hello\nworld! ', type: TEXT_CHANGED });
  t.deepEqual(state.textReducer.markers[0].endCol, 6);
  t.deepEqual(state.textReducer.markers[0].startCol, 5);
  t.deepEqual(state.textReducer.markers[0].endRow, 1);
  t.deepEqual(state.textReducer.markers[0].startRow, 1);
  t.deepEqual(state.textReducer.markers[1].endCol, 7);
  t.deepEqual(state.textReducer.markers[1].startCol, 6);
  t.deepEqual(state.textReducer.markers[1].endRow, 1);
  t.deepEqual(state.textReducer.markers[1].startRow, 1);
});

test('If model is empty, all characters typed are markers', (t) => {
  const state = reducers(
    { textReducer: { text: 'Hell', markers: [], model: '', correct: false } },
    { text: ' \n', type: TEXT_CHANGED });
  t.deepEqual(state.textReducer.markers[0].endCol, 1);
  t.deepEqual(state.textReducer.markers[0].startCol, 0);
  t.deepEqual(state.textReducer.markers[0].endRow, 0);
  t.deepEqual(state.textReducer.markers[0].startRow, 0);
});
