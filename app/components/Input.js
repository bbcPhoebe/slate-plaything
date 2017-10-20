import React from 'react';
import classNames from 'classnames';

// const apiKey = '40183719bff3a2086c3988';

// export function Input({ onClear, ...props }) {
//     console.log('window', window.getSelection)
//     return (
//         <div className="igm-input">
//         <span className="igm-input--control"><input {...props} /></span>
//         <button className="igm-input--clear" onClick={onClear}>&times;</button>
//         </div>
//     );
// }

export class Input extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { contentUri: '' }
        // this.onChange = this.onChange().bind(this);
    }

    // onChange(e) {
    //     console.log(e)
    //     e.stopPropagation();
    //     console.log('my input is changing')
    //     const contentUri = e.target.value;
    //     this.props.onChange(contentUri);
    //     this.setState({ contentUri });;
    // }

    render() {
        console.log(this.props)
        return (
            <div className='bob' >
                {this.props.children}
            </div>
        )
    }
    
}

// export function Input({ onChange, content, contentUri, clear, loading, error }) {
//     return (
//         <div className="igm-social-embed block-container ">
//             <
//         <Input
//             className={classNames('igm-social-embed__uri', 'igm-input', { 'igm-input__invalid': error })}
//             type="text"
//             placeholder="For example https://twitter.com/EricHolthaus/status/918197423159341056"
//             onChange={onChange}
//             /** TODO: stopPropagation is necessary because otherwise the void node gets the focus, our input blurs
//             * and the update does complete. Really that should be handled at the block level below
//             * but not figured out how to do that yet
//             */
//             onClick={(e) => e.stopPropagation()}
//             onClear={clear}
//             value={contentUri}
//         />
//         {error &&
//             <div>Couldn&apos;t load this embed</div>}
//         {loading &&
//             <div className="igm-social-embed__content igm-social-embed__content--loading">Loading...</div>
//         }
//         {(!loading && !error) &&
//             <div className="igm-social-embed__content" dangerouslySetInnerHTML={{ __html: content }}/>}
//         </div>
//     );
// }

export function Block({ node, editor, children }) {
    console.log('in input node', node, editor, children)
    function onChange(contentUri) {
        console.log('im changing in my block', contentUri)
        return editor.change(c => c.setNodeByKey(node.key, { data: { contentUri } }))
    }
    return (
        <Input
          onChange={onChange}
          value={node.data.get('contentUri')}
          children={children}
        />
      );
}
