import { setAttribute, setComponentProps, createComponent } from "./index";
export function diff(dom, vnode, container) {

    let ret = diffNode(dom, vnode);

    if (container) {
        container.appendChild(ret);
    }

    return ret;

}

export function diffNode(dom, vnode) {
    if (vnode == undefined || vnode == null || typeof vnode == "boolean") return "";
    let out = dom;
    if (typeof vnode == "string" || typeof vnode == "number") {
        if (dom && dom.nodeType == 3) {
            if (dom.textContent != vnode) {
                dom.textContent = vnode;
            }
        } else {
            out = document.createTextNode(vnode);
            if (dom && dom.parentNode) {
                dom.parentNode.replaceChild(out, dom);
            }
        }                               
        return out;
    }

    let { tag, attr, children } = vnode;

    if (typeof tag === "function") {
      return diffComponent(out, vnode);
    }

    if (!dom) {
        out = document.createElement(tag);
    }

    if (children && children.length > 0 || (out.childNode && out.childNode > 0)) {
        diffChildren(out, children)
    }  


    diffAttribute(out, vnode);

    return out;


}

function diffComponent(comp, vnode) {
    if (comp && comp.constructor == vnode.tag) {
        setComponentProps(comp, vnode.attr);
        return comp.base;
    } else {
        if (comp) {
            unmountComponent(comp);
            comp = null;
        }
  
        let node = createComponent(vnode.tag, vnode.attr);
        setComponentProps(node, vnode.attr);
        return node.base; 
    }
}

function unmountComponent(comp) {
    removeNode(comp.base)
}

function removeNode(dom) {
    if (dom.parentNode) {
        dom.parentNode.removeChild(dom);
    }
}

function diffChildren(dom, vchildren) {

}

function diffAttribute(dom, vnode) {

    let oldAttr = {}, attrArray = [...dom.attributes], newAttr = vnode.attr;
    attrArray.forEach((item) => {
        oldAttr[item.name] = item.value;
    })
    for (let key in oldAttr) {
        if (!key in newAttr) {
            setAttribute(key, dom, undefined);
        }
    }
    for (let key in newAttr) {
        if (newAttr[key] != oldAttr[key]) {
            setAttribute(key, dom, newAttr[key]);
        }
    }


}