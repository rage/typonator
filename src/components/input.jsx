// @flow
import React, { Component } from 'react';
import prefixer from 'utils/class-name-prefixer';
import CodeMirror, { TextMarker } from 'react-codemirror';

class Input extends Component {

  componentDidMount() {
    this.preventPaste();
    this.addMarkers();
  }

  componentWillUpdate() {
    this.markers.forEach(marker => marker.clear());
  }

  componentDidUpdate() {
    this.preventPaste();
    this.addMarkers();
  }

  textInput: CodeMirror;
  markers: TextMarker;

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

  preventPaste() {
    this.textInput.getCodeMirror().on('paste', (cm, event: Event) => {
      setTimeout(function () {
        cm.className = `${cm.className} ${prefixer('paste')}`;
      }, 200);
      event.preventDefault();
    });
  }

  props: {
    correct: boolean,
    text: string,
    onChange: (content: string) => any,
    markerRanges: Array<Object>
  };

  render() {
    let clsName = prefixer('answer');
    if (this.props.correct) {
      clsName = `${clsName} + " " + ${prefixer('checkmark')}`;
    }
    const editor = (
      <div ref={(input) => { this.wrapper = input; }}>
        <CodeMirror
          className={clsName}
          value={this.props.text}
          onChange={this.props.onChange}
          ref={(input) => { this.textInput = input; }}
          height={'5rem'}
        />
      </div>
    );
    return editor;
  }
}

export default Input;
