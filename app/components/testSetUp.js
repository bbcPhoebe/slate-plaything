import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body><div class="test"></div></body></html>');

const { window } = dom;

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
    console.log("i ran")
}

global.window = window;
global.window.getSelection = function() { 
    return { 
        addRange: function() {}, 
        removeAllRanges:function() {} 
    };
};
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};

copyProps(window, global);
