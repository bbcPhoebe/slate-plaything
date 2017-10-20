import React from 'react';

import Media from './Media';
import { getPreviousSiblingText } from '../helpers/getSpecificNode';

const apiKey = '40183719bff3a2086c3988';

export default class MediaContainer extends React.Component {
    constructor(props){
        super(props);
        console.log(this.state)
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
        console.log("media container", this.props, getPreviousSiblingText(this.props));
        return (
            <div className='media' {...this.props.attributes} >
                <Media {...this.props} dude={getPreviousSiblingText(this.props)} />
            </div>

        )
    }
}