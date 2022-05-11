import React from 'react';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const SunEditorSimpleWysiwyg = ({
    name,
    value,
    onChange,
    buttonOptions = [['formatBlock'], ['bold', 'italic', 'underline'], ['link', 'list']],
    formatOptions = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'],
}) => {
    const cleanPaste = html => {
        html = html.replace(
            /<(\/)*(\\?xml:|meta|link|span|font|del|ins|st1:|[ovwxp]:)((.|\s)*?)>/gi,
            '',
        );
        html = html.replace(/(class|style|type|start)=("(.*?)"|(\w*))/gi, '');
        html = html.replace(/<style(.*?)style>/gi, '');
        html = html.replace(/<script(.*?)script>/gi, '');
        html = html.replace(/<!--(.*?)-->/gi, '');

        return html;
    };

    return (
        <SunEditor
            name={name}
            setContents={value}
            onChange={onChange}
            setOptions={{
                height: 400,
                buttonList: buttonOptions,
                formats: formatOptions,
            }}
            onPaste={(_, html) => cleanPaste(html)}
        />
    );
};

export default SunEditorSimpleWysiwyg;
