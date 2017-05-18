// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State, Dispatch } from 'state/reducer';
import { decrement } from 'state/actions';

class App extends Component {

  componentDidMount() {
    setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    this.props.onDecrement();
  }

  render() {
    return (
      <div>Next refresh in: {this.props.remainingTime}.</div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    remainingTime: state.timerReducer.time,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onDecrement() {
      dispatch(decrement());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
