import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FILE_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

registerPlugin(FilePondPluginImagePreview);

const serverOptions = {
    url: FILE_API_URL,
    process: {
        headers: getHeaders()
    }
};
const FileUpload = ({ handleProcessFile }) => (
    <>
        <FilePond
            allowMultiple
            maxFiles={5}
            server={serverOptions}
            handleProcessFile={handleProcessFile}
        />
    </>
);

export default FileUpload;
