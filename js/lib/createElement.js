export function createElement(tag, props, ...children) {
    const element = document.createElement(tag);
    for (let prop in props) {
        if (prop === "style") {
            Object.assign(element.style, props[prop]);
        } else if (prop.startsWith("on")) {
            element[prop] = props[prop];
        } else {
            element.setAttribute(prop, props[prop]);
        }
    }
    children.forEach(child => {
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
        } else if (child) {
            element.appendChild(child);
        }
    });
    return element;
}