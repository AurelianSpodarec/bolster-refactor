import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const RichTextContainer = ({ value, onChange, placeholder, name }) => {
    return (
        <SunEditor
            name={name}
            setOptions={{
                height: 400,
                buttonList: [
                    ['bold', 'underline', 'italic', 'subscript', 'superscript'],
                    ['fontSize', 'formatBlock'],
                    ['removeFormat'],
                    ['fontColor', 'hiliteColor'],
                    ['outdent', 'indent'],
                    ['align', 'horizontalRule', 'list', 'table'],
                    ['link', 'image', 'video'],
                    ['fullScreen', 'showBlocks', 'codeView'],
                    ['preview', 'print'],
                    ['save', 'template'],
                ],
            }}
            setContents={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

export default RichTextContainer;
