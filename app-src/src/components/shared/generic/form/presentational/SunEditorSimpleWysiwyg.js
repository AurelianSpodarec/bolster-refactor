import React from 'react';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const SunEditorSimpleWysiwyg = ({ name, value, onChange }) => {
    return (
        <SunEditor
            name={name}
            setContents={value}
            onChange={onChange}
            setOptions={{
                height: 100,
                buttonList: [['bold', 'underline', 'italic'], ['link']],
            }}
        />
    );
};

export default SunEditorSimpleWysiwyg;
