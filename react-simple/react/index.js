import Component from './component';
const React = {
    createElement
}

function createElement(tag,attr,...children){
    return {
        tag,
        attr,
        children
    }
}

export { React as default, Component }