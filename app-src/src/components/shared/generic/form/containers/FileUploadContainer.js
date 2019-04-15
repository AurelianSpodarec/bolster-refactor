import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { FILE_API_URL } from 'config';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import FileUpload from '../presentational/FileUpload';
import { getAuthHeader } from 'helpers/api';
import { areArraysEqual } from 'helpers/generic';
import {
    fileUploadStart,
    fileUploadFinish
} from 'actions/shared/fileUpload/sync/fileUpload';

class FileUploadContainer extends Component {
    state = {
        showFieldError: false,
        isAfterAdd: false,
        files: []
    };

    render() {
        const { showFieldError } = this.state;
        const { errorsVisible, error, maxFiles, acceptedTypes } = this.props;
        let errorMessage;
        if (showFieldError || errorsVisible) errorMessage = error;

        return (
            <FileUpload
                files={this.state.files}
                serverOptions={this._getServerOptions()}
                error={errorMessage}
                maxFiles={maxFiles}
                acceptedTypes={acceptedTypes}
                handleUpdateFiles={this.handleUpdateFiles}
                handleBeforeAdd={this.handleBeforeAdd}
                handleFileUploadStart={this.handleFileUploadStart}
                handleFileUploadFinish={this.handleFileUploadFinish}
            />
        );
    }

    componentDidMount = () => {
        this._validate();

        // const { value } = this.props;
        // if (Array.isArray(value)) {
        //     this.setState({
        //         files: value.map(source => ({
        //             source,
        //             options: { type: 'local' }
        //         }))
        //     });
        // } else if (value && value.length) {
        //     this.setState({
        //         files: [
        //             {
        //                 source: value,
        //                 options: { type: 'local' }
        //             }
        //         ]
        //     });
        // }
    };

    componentWillUnmount = () => {
        const { name, removeFieldError } = this.props;
        removeFieldError(name);
    };

    componentDidUpdate = ({ value: prevValue }) => {
        const { value } = this.props;
        const hasArrChanged =
            Array.isArray(value) && !areArraysEqual(value, prevValue);
        const hasStringChanged =
            typeof value === 'string' && value !== prevValue;

        if (hasArrChanged || hasStringChanged) {
            this._validate(value);
        }
    };

    _validate = () => {
        const {
            name,
            error,
            required,
            addFieldError,
            removeFieldError,
            value
        } = this.props;
        console.log(value);
        if (required && !(value && value.length)) {
            addFieldError(name, 'This is a required field.');
        } else if (error) {
            removeFieldError(name);
        }
    };

    handleFileUploadStart = () => {
        this.props.fileUploadStart();
    };

    handleFileUploadFinish = () => {
        this._validate();
        this.props.fileUploadFinish();
    };

    _getServerOptions = () => {
        return {
            url: FILE_API_URL,
            process: this._handleUpload,
            revert: this._handleRevert,
            load: null,
            restore: null,
            fetch: null
        };
    };

    _handleUpload = (
        fieldName,
        file,
        metadata,
        load,
        error,
        progress,
        abort
    ) => {
        const formData = new FormData();
        formData.append(fieldName, file, file.name);

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const headers = {
            ...getAuthHeader(),
            'content-type': 'multipart/form-data'
        };
        const config = {
            headers,
            cancelToken: source.token,
            onUploadProgress: e =>
                progress(e.lengthComputable, e.loaded, e.total)
        };

        axios
            .post(FILE_API_URL, formData, config)
            .then(({ data: { s3Key } }) => {
                const { name, handleChange } = this.props;
                handleChange(name, s3Key);
                load(s3Key);
            })
            .catch(() => error('Something went wrong'));

        return {
            abort: () => {
                source.cancel('Upload canceled');
                abort();
            }
        };
    };

    handleUpdateFiles = fileItems => {
        this.setState({
            files: fileItems.map(fileItem => fileItem.file)
        });
    };

    _handleRevert = (s3Key, load) => {
        const { name, handleChange } = this.props;
        handleChange(name, s3Key);
        load();
    };
}

const mapStateToProps = ({ shared: { fieldErrorsReducer } }, ownProps) => ({
    error: fieldErrorsReducer.fieldErrors[ownProps.name],
    errorsVisible: fieldErrorsReducer.errorsVisible
});

const mapDispatchToProps = dispatch => ({
    addFieldError: (fieldName, error) => {
        dispatch(addFieldError(fieldName, error));
    },
    removeFieldError: fieldName => {
        dispatch(removeFieldError(fieldName));
    },
    fileUploadStart: () => {
        dispatch(fileUploadStart());
    },
    fileUploadFinish: () => {
        dispatch(fileUploadFinish());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileUploadContainer);
