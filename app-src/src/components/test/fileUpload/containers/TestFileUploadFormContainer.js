import React, { Component } from 'react';

import TestFileUploadForm from '../presentational/TestFileUploadForm';

class TestFileUploadFormContainer extends Component {
    state = {
        file: {}
    };

    render() {
        return (
            <TestFileUploadForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleChange = () => {
        console.log('changing...');
    };

    handleSubmit = () => {
        console.log('submitting...');
    };
}

export default TestFileUploadFormContainer;
