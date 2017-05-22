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

  props: {
    correct: boolean,
    text: string,
    onChange: (content: string) => any,
    markerRanges: Array<Object>
  };

  addMarkers() {
    const codeDocument = this.textInput.getCodeMirror().getDoc();
    this.markers = this.props.markerRanges.map(range => (
      codeDocument.markText(
        { line: range.startRow, ch: range.startCol },
        { line: range.endRow, ch: range.endCol },
        { className: prefixer('wrong'), inclusiveLeft: true, inclusiveRight: false },
      )
    ));
  }

  textInput: CodeMirror;
  markers: TextMarker;

  render() {
    let clsName = prefixer('answer');
    if (this.props.correct) {
      clsName = `${clsName} + " " + ${prefixer('checkmark')}`;
    }
    const editor = (
      <CodeMirror
        className={clsName}
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
