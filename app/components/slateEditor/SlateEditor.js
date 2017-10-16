import React from 'react'
import { Editor } from 'slate-react'

function SlateEditor(props) {
    const { onChange, slateState } = props;
    return (
        <Editor
            state={slateState}
            onChange={onChange}
        />
    )

}

export default SlateEditor;
