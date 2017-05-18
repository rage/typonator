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
          <label className={prefixer('instructions')} HTMLfor="inputfield">Kirjoita:</label>
          <Input onChange={this.props.onChange} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    modelText: state.writerReducer.model,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onChange(text: string) {
      dispatch(textAction(text));
    },
  };
}

// contextTypes?

export default connect(mapStateToProps, mapDispatchToProps)(App);
