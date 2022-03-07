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
        />
    );
};

export default SunEditorSimpleWysiwyg;
