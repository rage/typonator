import test from 'ava';
import reducers from 'state/reducer';
import { TIMER_DECREMENT } from 'state/actions';


test('Decrementing time works as intended', (t) => {
  let state;
  state = reducers({ timerReducer: { time: 10 } }, { type: TIMER_DECREMENT });
  t.deepEqual(state, { timerReducer: { time: 9 } });
  state = reducers({ timerReducer: { time: 9 } }, { type: TIMER_DECREMENT });
  t.deepEqual(state, { timerReducer: { time: 8 } });
  state = reducers({ timerReducer: { time: 8 } }, { type: TIMER_DECREMENT });
  t.deepEqual(state, { timerReducer: { time: 7 } });
  state = reducers({ timerReducer: { time: 7 } }, { type: TIMER_DECREMENT });
  t.deepEqual(state, { timerReducer: { time: 6 } });
  state = reducers({ timerReducer: { time: 6 } }, { type: TIMER_DECREMENT });
  t.deepEqual(state, { timerReducer: { time: 5 } });
  state = reducers({ timerReducer: { time: 5 } }, { type: TIMER_DECREMENT });
  t.deepEqual(state, { timerReducer: { time: 4 } });
  state = reducers({ timerReducer: { time: 4 } }, { type: TIMER_DECREMENT });
  t.deepEqual(state, { timerReducer: { time: 3 } });
  state = reducers({ timerReducer: { time: 3 } }, { type: TIMER_DECREMENT });
  t.deepEqual(state, { timerReducer: { time: 2 } });
  state = reducers({ timerReducer: { time: 2 } }, { type: TIMER_DECREMENT });
  t.deepEqual(state, { timerReducer: { time: 1 } });
  state = reducers({ timerReducer: { time: 1 } }, { type: TIMER_DECREMENT });
  t.deepEqual(state, { timerReducer: { time: 0 } });
  state = reducers({ timerReducer: { time: 0 } }, { type: TIMER_DECREMENT });
  t.deepEqual(state, { timerReducer: { time: 10 } });
});
