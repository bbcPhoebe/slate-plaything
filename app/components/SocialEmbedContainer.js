import React from 'react';

export function SocialEmbedContainer(props) {
        return (
            <div className='socialEmbed' {...props.attributes}>
                {props.children} 
            </div>)
}

