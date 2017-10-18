import React from 'react'
import { Editor } from 'slate-react'

import Block, { Container as SocialEmbedContainer } from '../SocialEmbed';


const SocialEmbed = Block(SocialEmbedContainer);

SocialEmbed.displayName = "BlockContainer"

class SlateEditor extends React.PureComponent {
    constructor(props) {
        super(props)
        
        this.schema = {
            nodes: {
                'SocialEmbed': (props) => {
                    console.log('social embed',props)
                    return <SocialEmbed {...props} />
                },
                'Paragraph': (props) => {
                    console.log('paragraph',props)
                    return (
                    <div className='paragraph' {...props.attributes}>
                        {props.children}
                    </div>
                    )
                }

            }
        }
    }
    
    render() {
        const { onChange, slateState } = this.props;
        return (
            <Editor
                state={slateState}
                onChange={onChange}
                schema={this.schema}
            />
        )
    }
}

export default SlateEditor;
