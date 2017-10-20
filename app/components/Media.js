import React from 'react';

export default function Media(props) {

    console.log('media')
        return (
            <div className='media' {...props.attributes} >
                {props.state.toJS().toString()}
            </div>

        )
}