import React from 'react';
import { State } from 'slate';
import { Editor } from 'slate-react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Block, { Container, Input, SocialEmbed } from './SocialEmbed';

const BlockContainer = Block(Container)
BlockContainer.displayName = "BlockContainer"
const schema = {
    nodes: {
        'block-type-under-test': BlockContainer
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
        const wrapper = mount(<Editor schema={schema} state={state} onChange={() => {}}/>);
        const block = wrapper.find('BlockContainer')
        block.setProps({editor: null})
        // we think it freaks out becuase of editor in Block, which means it is recursive
        // i.e. editor has block and block has editor
        const json = toJson(block, {mode: 'shallow'})
        console.log('wrapper', json )
        expect(json).toMatchSnapshot()
    })

    it('It passes value as the value prop', () => {

        const wrapper = mount(editor);
        expect(wrapper.find(Container).props().value).toEqual('1')
        expect(wrapper.find(Container).props().value).toEqual('1')
    })
})
