import React, { Component } from 'react';

import TestFileUploadForm from '../presentational/TestFileUploadForm';

class TestFileUploadFormContainer extends Component {
    state = {
        // file:
        // 'https://dizelaxol0ewg.cloudfront.net/5aeb8e07-7765-4425-948f-5481f81027bc/larry.jpg'
        // file: 'tmp/00fd67d1-8c89-4726-8f18-2df81cb8b132/larry.jpg'
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
        // console.log(s3Key);
        const { [name]: file } = this.state;
        this.setState({ [name]: file === s3Key ? '' : s3Key });
    };

    handleSubmit = () => {};
}

export default TestFileUploadFormContainer;
