import escapeHtml from 'escape-html';
import { jsx } from 'slate-hyperscript';
import { Node, Text } from 'slate';

export const serialize = node => {
    if (Text.isText(node)) {
        return escapeHtml(node.text);
    }

    const children = node.children.map(n => serialize(n)).join('');

    switch (node.type) {
        case 'quote':
            return `<blockquote><p>${children}</p></blockquote>`;
        case 'paragraph':
            return `<p>${children}</p>`;
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`;
        default:
            return children;
    }
};

const deserialize = el => {
    if (el.nodeType === 3) {
        return el.textContent;
    } else if (el.nodeType !== 1) {
        return null;
    }

    const children = Array.from(el.childNodes).map(deserialize);

    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children);
        case 'BR':
            return '\n';
        case 'BLOCKQUOTE':
            return jsx('element', { type: 'quote' }, children);
        case 'P':
            return jsx('element', { type: 'paragraph' }, children);
        case 'A':
            return jsx('element', { type: 'link', url: el.getAttribute('href') }, children);
        default:
            return el.textContent;
    }
};

export const HTMLtoSlate = html => {
    const document = new DOMParser().parseFromString(html, 'text/html');
    deserialize(document.body);
};
