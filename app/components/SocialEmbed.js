import React from 'react';
import classNames from 'classnames';

const apiKey = '40183719bff3a2086c3988';

export function Input({ onClear, ...props }) {
    console.log('window', window.getSelection)
    return (
        <div className="igm-input">
        <span className="igm-input--control"><input {...props} /></span>
        <button className="igm-input--clear" onClick={onClear}>&times;</button>
        </div>
    );
}

export function SocialEmbed({ onChange, content, contentUri, clear, loading, error }) {
    return (
        <div className="igm-social-embed block-container ">
        <Input
            className={classNames('igm-social-embed__uri', 'igm-input', { 'igm-input__invalid': error })}
            type="text"
            placeholder="For example https://twitter.com/EricHolthaus/status/918197423159341056"
            onChange={onChange}
            /** TODO: stopPropagation is necessary because otherwise the void node gets the focus, our input blurs
            * and the update does complete. Really that should be handled at the block level below
            * but not figured out how to do that yet
            */
            onClick={(e) => e.stopPropagation()}
            onClear={clear}
            value={contentUri}
        />
        {error &&
            <div>Couldn&apos;t load this embed</div>}
        {loading &&
            <div className="igm-social-embed__content igm-social-embed__content--loading">Loading...</div>
        }
        {(!loading && !error) &&
            <div className="igm-social-embed__content" dangerouslySetInnerHTML={{ __html: content }}/>}
        </div>
    );
}

export class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: '', contentUri: '', error: false };
    }

    loadContent(contentUri) {
        this.setState({ contentUri });
        this.setState({ loading: true, error: false });
        return fetch(`http://iframe.ly/api/oembed?url=${contentUri}&api_key=${apiKey}&iframe=true&omit_script=true&iframely=more`)
        .then((res) => {
            if (!res.ok) throw new Error('Could not find preview');
            return res.json();
        })
        .then(json => this.setState({ content: json.html, loading: false }))
        .catch(() => this.setState({ content: '', loading: false, error: true }));
    }

    render() {
        console.log('in container', this.props)
        return (
        <SocialEmbed
            onChange={e => {
            e.stopPropagation();
            
            const contentUri = e.target.value;
            this.props.onChange(contentUri);
            this.loadContent(contentUri);
            }}
            contentUri={this.props.value}
            content={this.state.content}
            loading={this.state.loading}
            error={this.state.error}
            clear={(e) => {
            /** TODO: stopPropagation is necessary because otherwise the void node gets the focus, our input blurs
            * and the update does complete. Really that should be handled at the block level below
            * but not figured out how to do that yet
            */
            e.stopPropagation();
            this.props.onChange('');
            this.setState({ content: '', contentUri: '', error: false })
            }}
        />
        );
    }
}

const Block = (Component) => ({ node, editor }) => {
        const onChange = (contentUri) => editor.change(c => c.setNodeByKey(node.key, { data: { contentUri } }));
        const value = node.data.get('contentUri');
        return <Component key={node.key} onChange={onChange} value={value} />;
}

export default Block;
