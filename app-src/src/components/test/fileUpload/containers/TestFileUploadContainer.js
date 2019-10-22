import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { FILE_API_URL } from 'config';

import TestFileUpload from '../presentational/TestFileUpload';
import withFieldValidation from 'components/shared/generic/form/hocs/withFieldValidation';
import { getAuthHeader } from 'helpers/api';
import FileDropBox from './FileDropBox';
import { fileUploadStart, fileUploadFinish } from 'actions/shared/fileUpload/sync/fileUpload';
import { areArraysEqual } from 'helpers/generic';

// const testImageSrc =
//     'https://dizelaxol0ewg.cloudfront.net/5aeb8e07-7765-4425-948f-5481f81027bc/larry.jpg';
class FileUploadContainer extends Component {
    static defaultProps = {
        maxFiles: 1,
        handleChange: () => {}
    };

    constructor(props) {
        super(props);

        const { value } = props;
        let fileS3Keys = value;
        if (!Array.isArray(value)) {
            fileS3Keys = value ? [value] : [];
        }

        this.state = {
            fileS3Keys,
            progress: null,
            softError: null
        };

        this.source = null;
        this.inputRef = React.createRef();
    }

    render() {
        const { fileS3Keys, progress, isDragging, softError } = this.state;
        return (
            <>
                <FileDropBox onDrop={this.handleFileDrop}>
                    <TestFileUpload
                        fileS3Keys={fileS3Keys}
                        progress={progress}
                        isDragging={isDragging}
                        onChange={this.handleUpload}
                        onDelete={this.handleDelete}
                        onCancel={this.handleCancel}
                        inputRef={this.inputRef}
                        onAddFileClick={this.handleAddFileClick}
                    />
                </FileDropBox>
                {!!softError && <p className="error red-text text-accent-4"> {softError}</p>}
            </>
        );
    }

    componentWillUnmount = () => {
        const { fileUploadFinish } = this.props;
        // ensures the file upload is set to 0 if the page is
        // navigated away from before files have finished uploading.
        fileUploadFinish('close');
    };

    componentDidUpdate = ({ value: prevValue }) => {
        const { value } = this.props;

        if (Array.isArray(value) && !areArraysEqual(value, prevValue)) {
            this.setState({ fileS3Keys: value });
        } else if (value !== prevValue) {
            this.setState({ fileS3Keys: value ? [value] : [] });
        }
    };

    _validateFileType = str => {
        const fileType = str.toLowerCase();

        const { acceptedTypes } = this.props;
        if (!acceptedTypes) {
            return true;
        }

        if (acceptedTypes.includes('image/*') && fileType.includes('image')) {
            return true;
        }

        return acceptedTypes.some(x => x.toLowerCase() === fileType);
    };

    _handleChange = () => {
        const { maxFiles, handleChange, showError, name } = this.props;
        const { fileS3Keys } = this.state;
        if (maxFiles === 1) {
            handleChange(name, fileS3Keys[0] || '');
        } else {
            handleChange(name, fileS3Keys);
        }

        showError();
    };

    handleFileDrop = async files => {
        this.props.fileUploadStart();

        for (const file of files) {
            await this._uploadFile(file);
        }

        this.props.fileUploadFinish();
    };

    handleAddFileClick = e => {
        e.preventDefault();
        this.inputRef.current.click();
    };

    _handleProgress = e => {
        const percentCompleted = Math.round((e.loaded * 100) / e.total);
        this.setState({ progress: percentCompleted });
    };

    handleCancel = () => {
        this.source.cancel('Upload cancelled.');
    };

    handleUpload = async e => {
        const files = e.target.files;
        this.props.fileUploadStart();

        const { maxFiles } = this.props;
        // if there is one file, replace the existing.
        if (maxFiles === 1) {
            await new Promise(resolve => {
                this.setState({ fileS3Keys: [] }, resolve);
            });
        }

        for (const file of files) {
            await this._uploadFile(file);
        }

        this.props.fileUploadFinish();
    };

    _uploadFile = async file => {
        if (!file) {
            return;
        }

        const { name, maxFiles, skipTemp = false } = this.props;
        const { fileS3Keys } = this.state;
        if (fileS3Keys.length === maxFiles) {
            this.setState({ softError: `You can only upload a maximum of ${maxFiles} files.` });
            return;
        }
        if (!this._validateFileType(file.type)) {
            this.setState({ softError: `The file type '${file.type}' is not permitted.` });
            return;
        }

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

            this.setState(
                prevState => ({
                    fileS3Keys: prevState.fileS3Keys.concat(newS3Key),
                    softError: null
                }),
                this._handleChange
            );
        } catch (e) {
            if (!axios.isCancel(e)) {
                this.setState({ softError: `There was a problem uploading ${file.name}.` });
            }
        }
        this.setState({ progress: null });
    };

    handleDelete = (e, s3Key) => {
        e.preventDefault();

        this.setState(
            prevState => ({
                fileS3Keys: prevState.fileS3Keys.filter(key => key !== s3Key),
                softError: null
            }),
            this._handleChange
        );
    };
}

const mapDispatchToProps = dispatch => ({
    fileUploadStart: () => dispatch(fileUploadStart()),
    fileUploadFinish: close => dispatch(fileUploadFinish(close))
});

const WithConnect = connect(
    null,
    mapDispatchToProps
)(FileUploadContainer);

export default withFieldValidation(WithConnect);
