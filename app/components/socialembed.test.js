import React from 'react';
import { State } from 'slate';
import { Editor } from 'slate-react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Block, { Container, Input } from './SocialEmbed';

const blockContainer = Block(Container)
const schema = {
    nodes: {
        'block-type-under-test': blockContainer
    }
}

const state = State.fromJSON({
        "document": {
        "nodes": [
            {
            "kind": "block",
            "type": "block-type-under-test",
            "data" : {
                contentUri: '1'
            }
            }
        ]
        }
});

const editor = <Editor schema={schema} state={state}/>

describe('Block', () => {
    it('renders a container', () => {    
        const wrapper = mount(editor);
        console.log('wrapper', wrapper.debug())
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    xit('It passes value as the value prop', () => {

        const wrapper = mount(editor);
        expect(wrapper.find(Container).props().value).toEqual('1')
    })
})
