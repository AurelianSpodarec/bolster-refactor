import React from 'react';
import FileIcon from '_content/images/icons/dl-file-icon.svg';

const FileTypeIcon = ({ src = FileIcon, key, alt = 'file type icon', height = 24, width = 24 }) => {
    return <img key={key} src={src} alt={alt} height={height} width={width} />;
};

export default FileTypeIcon;
