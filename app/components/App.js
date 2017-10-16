import React from 'react'
import { Editor } from 'slate-react'
import { State } from 'slate'

import SlateEditor from './slateEditor/SlateEditor'

const initialState = State.fromJSON({
    document: {
        nodes: [
        {
            kind: 'block',
            type: 'paragraph',
            nodes: [
            {
                kind: 'text',
                ranges: [
                {
                    text: 'A line of text in a paragraph.'
                }
                ]
            }
            ]
        }
        ]
    }
})

// Define our app...
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { state: initialState };
        this.onChange = this.onChange.bind(this)
    }
    // On change, update the app's React state with the new editor state.
    onChange({ state }) {
        console.log('in onchange')
        this.setState({ state })
    }

    // Render the editor.
    render() {
        console.log('state then slate state', this.state, this.state.state.toJS())
        return (
            <SlateEditor
                slateState={this.state.state}
                onChange={this.onChange}
            />
        )
    }

}

export default App;
