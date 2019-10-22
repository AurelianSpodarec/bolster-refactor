import React, { Component } from 'react';
import axios from 'axios';

import { FILE_API_URL } from 'config';

import TestFileUpload from '../presentational/TestFileUpload';
import withFieldValidation from 'components/shared/generic/form/hocs/withFieldValidation';
import { getAuthHeader } from 'helpers/api';

// const testImageSrc =
//     'https://dizelaxol0ewg.cloudfront.net/5aeb8e07-7765-4425-948f-5481f81027bc/larry.jpg';
class FileUploadContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileS3Key: '',
            progress: null
        };

        this.source = null;
    }

    render() {
        const { fileS3Key, progress } = this.state;
        return (
            <TestFileUpload
                value={fileS3Key}
                progress={progress}
                onChange={this.handleUpload}
                onDelete={this.handleDelete}
                onCancel={this.handleCancel}
            />
        );
    }

    _getFileName = src => {
        return src.match('[^/]*$')[0];
    };

    _handleProgress = e => {
        const percentCompleted = Math.round((e.loaded * 100) / e.total);
        this.setState({ progress: percentCompleted });
        console.log({ percentCompleted });
    };

    handleCancel = () => {
        this.source.cancel('Upload cancelled.');
    };

    handleUpload = async e => {
        console.log(e.target.files);
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const { addFieldError, showError, name, skipTemp = false } = this.props;

        const formData = new FormData();
        formData.append(name, file, file.name);

        this.source = axios.CancelToken.source();
        const headers = {
            ...getAuthHeader(),
            'content-type': 'multipart/form-data'
        };
        const reqConfig = {
            headers,
            cancelToken: this.source.token,
            onUploadProgress: this._handleProgress
        };

        try {
            const response = await axios.post(
                `${FILE_API_URL}?skipTemp=${skipTemp}`,
                formData,
                reqConfig
            );
            const newS3Key = response.data.s3Key;
            console.log(newS3Key);
            this.setState({ fileS3Key: newS3Key });
        } catch (e) {
            if (!axios.isCancel(e)) {
                addFieldError(name, `There was a problem uploading ${file.name}.`);
                showError();
                console.log('error!', { e });
            }
        }

        this.setState({ progress: null });
    };

    handleDelete = (e, s3Key) => {
        e.preventDefault();
        console.log(s3Key);
        this.setState({ fileS3Key: '' });
    };
}

export default withFieldValidation(FileUploadContainer);
