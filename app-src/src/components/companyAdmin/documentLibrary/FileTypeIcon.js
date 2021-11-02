import React from 'react';
import FileIcon from '_content/images/icons/dl-file-icon.svg';

const FileTypeIcon = ({
    src = FileIcon,
    key,
    alt = 'file type icon',
    height = 24,
    width = 24,
    className,
    style = {},
}) => {
    return (
        <img
            className={className}
            key={key}
            src={src}
            alt={alt}
            height={height}
            width={width}
            style={style}
        />
    );
};

export default FileTypeIcon;
