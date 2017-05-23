// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State, Dispatch } from 'state/reducer';
import { textAction } from 'state/actions';
import prefixer from 'utils/class-name-prefixer';
import Input from './input';

class App extends Component {

  render() {
    return (
      <div className={prefixer('container')}>
        <div>
          <div className={prefixer('model-text')}>{this.props.modelText}</div>
        </div>
        <div>
          <label
            className={prefixer('instructions')} htmlFor="inputfield"
          >Kirjoita sama koodi alla olevaan kenttään:
          </label>
          <Input
            id="answer"
            onChange={this.props.onChange}
            markerRanges={this.props.markerRanges}
            text={this.props.answer}
            correct={this.props.correct}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    modelText: state.writerReducer.model,
    markerRanges: state.writerReducer.markers,
    answer: state.writerReducer.text,
    correct: state.writerReducer.correct,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onChange(text: string) {
      dispatch(textAction(text));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
