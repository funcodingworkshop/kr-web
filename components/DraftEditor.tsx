import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';

export default function MyEditor() {
    return (
        <div
            style={{
                border: '1px solid black',
                minHeight: '6em',
                cursor: 'text',
            }}
        >
            <Editor
                editorState={EditorState.createEmpty()}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
            />
        </div>
    );
}
