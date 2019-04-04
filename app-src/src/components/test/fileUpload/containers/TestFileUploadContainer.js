import React, { Component } from 'react';

import TestFileUpload from '../presentational/TestFileUpload';

class FileUploadContainer extends Component {
    state = {
        showFieldError: false,
        isAfterAdd: false
    };
    render() {
        return <TestFileUpload handleProcessFile={this.handleProcessFile} />;
    }

    handleProcessFile = () => {
        console.log('hihi');
    };
}

export default FileUploadContainer;
