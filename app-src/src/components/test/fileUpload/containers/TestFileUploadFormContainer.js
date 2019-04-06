import React, { Component } from 'react';

import TestFileUploadForm from '../presentational/TestFileUploadForm';

class TestFileUploadFormContainer extends Component {
    state = {
        file: ''
    };

    render() {
        return (
            <TestFileUploadForm
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleChange = (name, s3Key) => {
        const { [name]: file } = this.state;
        this.setState({ [name]: file === s3Key ? '' : s3Key });
    };

    handleSubmit = () => {};
}

export default TestFileUploadFormContainer;
