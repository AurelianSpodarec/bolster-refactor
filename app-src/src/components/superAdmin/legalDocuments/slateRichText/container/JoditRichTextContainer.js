import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const RichTextContainer = ({ value, onChange }) => {
    const editor = useRef(null);

    return (
        <JoditEditor
            ref={editor}
            value={value}
            config={{
                readonly: false,
                buttons:
                    'bold,italic,underline,|,|,ul,ol,|,outdent,indent,|,fontsize,paragraph,|,image,file,video,table,link,|',
            }}
            // onBlur={newContent => onChange(newContent.target.innerHTML)}
            onChange={newContent =>
                newContent.target ? onChange(newContent.target.innerHTML) : {}
            }
        />
    );
};

export default RichTextContainer;
