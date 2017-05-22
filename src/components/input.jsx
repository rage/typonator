// @flow
import React, { Component } from 'react';
import prefixer from 'utils/class-name-prefixer';
import CodeMirror, { TextMarker } from 'react-codemirror';

class Input extends Component {

  componentDidMount() {
    this.addMarkers();
  }

  componentWillUpdate() {
    this.markers.forEach(marker => marker.clear());
  }

  componentDidUpdate() {
    this.addMarkers();
  }

  addMarkers() {
    const codeDocument = this.textInput.getCodeMirror().getDoc();
    this.markers = this.props.correct.map(range => (
      codeDocument.markText(
        { line: range.startRow, ch: range.startCol },
        { line: range.endRow, ch: range.endCol },
        { className: prefixer('wrong'), inclusiveLeft: true, inclusiveRight: false })
    ));
  }

  textInput: CodeMirror;
  markers: TextMarker;

  render() {
    const editor = (
      <CodeMirror
        className={prefixer('answer')}
        value={this.props.text}
        onChange={this.props.onChange}
        ref={(input) => { this.textInput = input; }}
        height={'5rem'}
      />
    );
    return editor;
  }
}

export default Input;
