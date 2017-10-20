import React from 'react'
import { Editor } from 'slate-react'
import { getPreviousSiblingText } from '../../helpers/getSpecificNode';
import Block, { Container } from '../SocialEmbed';
import { Block as Input } from '../Input';
import Media from '../Media';
import MediaContainer from '../MediaContainer';
import { SocialEmbedContainer } from '../SocialEmbedContainer';


const SocialEmbed = Block(Container);

SocialEmbed.displayName = "BlockContainer"

class SlateEditor extends React.PureComponent {
    constructor(props) {
        super(props)
        
        this.schema = {
            nodes: {
                'SocialEmbed': class CustomNode extends React.Component {
                    shouldComponentUpdate(previousProps, nextProps) {
                        // return true here to trigger a re-render
                        console.log('social embed in component update',nextProps)
                        return false;
                    }

                    render() {
                        console.log('i re render social')
                        return <SocialEmbed {...this.props} />
                    }
                },
                'Paragraph': (props) => {
                    // console.log('paragraph',props)
                    return (
                    <div className='paragraph' {...props.attributes}>
                        {props.children}
                    </div>
                    )
                },
                'Input': (props) => {
                    console.log('in input', props)
                    return (
                        <Input {...props} />
                        )
                },
                'Media': (props) => {
                    console.log('media', props.state.toJS(), getPreviousSiblingText(props))
                    return (
                        <Media {...props} />
                    )
                },
                'SocialEmbedTest': (props) => {
                    // console.log('social embed test',props)

                    return (
                        <SocialEmbedContainer {...props} />
                    )
                },
                'MediaContainer': (props) => {
                    console.log('mediaContainer', props.state.toJS(), getPreviousSiblingText(props))
                    return (
                        <MediaContainer {...props} />
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
