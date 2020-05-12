import { Component } from '../react';
import { diff, diffNode } from './diff';

const ReactDom = {
    render
}

function render(vnode, container, dom) {
    return diff(dom, vnode, container);
}

export function createComponent(comp, props) {
    let inst;
    if (comp.prototype.render) {
        inst = new comp(props)
    } else {
        inst = new Component(props);
        inst.constructor = comp;
        inst.render = comp.bind(inst, props);
    }
    return inst;
}


export function setComponentProps(comp, props) {
    let { componentWillMount, componentWillReceiveProps } = comp;
    if (!comp.base) {
        componentWillMount && componentWillMount()
    } else {
        componentWillReceiveProps && componentWillReceiveProps(props)
    }
    comp.props = props;
    renderComponent(comp);
}

export function renderComponent(comp) {
    let { componentWillUpdate, componentDidMount, componentDidUpdate } = comp;
    const render = diffNode(comp.base?comp:undefined, comp.render());
    if (comp.base && componentWillUpdate) {
        componentWillUpdate()
    }
    if (comp.base) {
        if (componentDidUpdate) {
            componentDidUpdate();
        }
    } else if (componentDidMount) {
        componentDidMount()
    }
    comp.base = render;
}



function _render(vnode) {
    if (vnode == undefined || vnode == null || typeof vnode == "boolean") return "";

    if (typeof vnode == "string" || typeof vnode == "number") {
        let textNode = document.createTextNode(vnode);
        return textNode;

    }

    let { tag, attr, children } = vnode;

    if (typeof tag == "function") {
        const comp = createComponent(tag, attr);
        setComponentProps(comp, attr);
        console.log(comp);

        return comp.base;
    }

    let node = document.createElement(tag);

    for (let key in attr) {
        let value = attr[key];
        setAttribute(key, node, value);
    }

    if (children) {
        children.forEach(element => {
            render(element, node);
        });
    }



    return node


}

export function setAttribute(key, node, value) {
    if (/on\w+/.exec(key)) {
        key = key.toLowerCase();
    }
    if (key == "style") {
        for (let styleName in value) {
            if (typeof value[styleName] == "number") {
                node.style[styleName] = value[styleName] + "px"
            } else {
                node.style[styleName] = value[styleName]
            }
        }
    } else if (key in node) {
        node[key] = value;
    } else if (value) {
        node.setAttribute(key, value)
    } else {
        node.setAttribute(key, "");
    }
}



export default ReactDom;