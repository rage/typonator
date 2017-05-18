// @flow
import React, { Component } from 'react';
import prefixer from 'utils/class-name-prefixer';

class Input extends Component {
  textInput: HTMLTextAreaElement;

  render() {
    return (
      <div
        contentEditable="true"
        className={prefixer('answer')}
        value={this.props.text}
        ref={(input) => { this.textInput = input; }}
        onChange={() => { this.props.onChange(this.textInput.value); }}
      />
    );
  }
}

export default Input;
