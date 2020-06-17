import React, { Component } from 'react';
import { Debounce } from '../../utils/debounceUtil'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = Debounce((editorState) => {
    // console.log('~~~~~~~')
    this.setState({
      editorState,
    });
  }, 300)

  uploadImageCallBack = file => {
    return new Promise(
        (resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', '/manage/img/upload');
          xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
          const data = new FormData();
          data.append('image', file);
          xhr.send(data);
          xhr.addEventListener('load', () => {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          });
          xhr.addEventListener('error', () => {
            const error = JSON.parse(xhr.responseText);
            reject(error);
          });
        }
      );
  }

  // 自定义返回输入的文本内容
  getDetail = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
        //   wrapperClassName="demo-wrapper"
        //   editorClassName="demo-editor"
        
          editorStyle={{height: 200, border: '1px solid #000', paddingLeft: '10px'}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
        {
        //     <textarea
        //   disabled
        //   value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        // />
        }
        
      </div>
    );
  }
}