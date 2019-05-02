// Thanks to https://gist.github.com/developit/35183bb5a0b37ddcd375a89f67bae816#file-preact-custom-element-js

import { h, render } from "/vendor/preact/dist/preact.js";

const Empty = () => null;

export default function register(Component, tagName) {
  const prototype = Object.create(HTMLElement.prototype);
  prototype._vdomComponent = Component;
  prototype.attachedCallback = prototype.attributeChangedCallback = renderElement;
  prototype.detachedCallback = unRenderElement;
  return document.registerElement(
    tagName || Component.displayName || Component.name,
    { prototype }
  );
}

function renderElement() {
  this._root = render(
    toVdom(this, this._vdomComponent),
    this.shadowRoot || this.createShadowRoot(),
    this._root
  );
}

function unRenderElement() {
  render(h(Empty), this.shadowRoot, this._root);
}

function toVdom(element, nodeName) {
  if (element.nodeType === 3) return element.nodeValue;
  if (element.nodeType !== 1) return null;
  const children = [];
  const props = {};
  let i = 0;
  const a = element.attributes;
  const cn = element.childNodes;
  for (i = a.length; i--; ) props[a[i].name] = a[i].value;
  for (i = cn.length; i--; ) children[i] = toVdom(cn[i]);
  return h(nodeName || element.nodeName.toLowerCase(), props, children);
}
