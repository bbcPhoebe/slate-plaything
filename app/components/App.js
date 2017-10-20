import React from 'react'
import { Editor } from 'slate-react'
import { State, Change, Block } from 'slate'
import { Menu, Icon } from 'semantic-ui-react'

import SlateEditor from './slateEditor/SlateEditor'

const initialState = State.fromJSON({
    document: {
        nodes: [
        {
            kind: 'block',
            type: 'Paragraph',
            "nodes": [
                {
                    "kind": "text",
                    "ranges": [
                        {
                        "text": "dude paragraph"
                        }
                    ]
                }
              ]
        },
        {
            kind: 'block',
            type: 'SocialEmbed',
            isVoid: true,
            readOnly: true
        }
        // {
        //     kind: 'block',
        //     type: 'SocialEmbedTest',
        //     "nodes": [
                
        //         {
        //             kind: 'block',
        //             type: 'Input',
        //             "nodes": [
        //                 {
        //                     "kind": "text",
        //                     "ranges": [
        //                         {
        //                         "text": "dude social and input"
        //                         }
        //                     ]
        //                 }
        //               ]
        //         },
        //         {
        //             kind: 'block',
        //             type: 'MediaContainer',
        //             isVoid: true
        //         }
        //       ]
        // }
        ]
    }
})



// Define our app...
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { state: initialState };
        this.onChange = this.onChange.bind(this)
        this.addBlock = this.addBlock.bind(this)
    }
    // On change, update the app's React state with the new editor state.
    onChange({ state }) {
        console.log('in onchange')
        this.setState({ state })
    }

    addBlock(type, state) {
        console.log('adding block', type, state)
        const { state: slateState } = state
        const blockInfo = {
            data: {},
            isVoid: false,
            type: type,
            "nodes": [
                {
                    "kind": "text",
                    "ranges": [
                        {
                        "text": "dude paragraph"
                        }
                    ]
                }
              ]
        }
        if (type === 'SocialEmbed'){

            
        }
        const newState = slateState.change()
            .insertBlock(Block.create(blockInfo))
        console.log(newState)
        this.onChange(newState)
    }

    // Render the editor.
    render() {
        console.log('state then slate state', this.state, this.state.state.toJS())
        return (
            <div>
                <Menu vertical>
                    <Menu.Item name='social-embed' active={true} onClick={() => this.addBlock('SocialEmbed', this.state)}>
                        Add social embed
                    </Menu.Item>
                    <Menu.Item name='paragraph' active={true} onClick={() => this.addBlock('Paragraph', this.state)}>
                        Add paragraph
                    </Menu.Item>
                </Menu>
                <SlateEditor
                    slateState={this.state.state}
                    onChange={this.onChange}
                />
            </div>
        )
    }

}

export default App;
