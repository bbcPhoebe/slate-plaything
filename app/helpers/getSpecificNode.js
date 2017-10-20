export function getPreviousSiblingText(props){
    return props.state.document.getPreviousSibling(props.node).getFirstText().text;
}

export function getNextSiblingText(props){
    return props.state.document.getNextSibling(props.node).getFirstText().text;
}
