import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { FILE_API_URL } from 'config';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import TestFileUpload from '../presentational/TestFileUpload';
import { getAuthHeader } from 'helpers/api';
import { areArraysEqual } from 'helpers/generic';

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
            <TestFileUpload
                files={this.state.files}
                serverOptions={this._getServerOptions()}
                error={errorMessage}
                maxFiles={maxFiles}
                acceptedTypes={acceptedTypes}
                handleUpdateFiles={this.handleUpdateFiles}
            />
        );
    }

    componentDidMount = () => {
        this._validate();

        const { value } = this.props;
        if (Array.isArray(value)) {
            this.setState({
                files: value.map(source => ({ source, options: { type: 3 } }))
            });
        } else if (value && value.length) {
            this.setState({
                files: [
                    {
                        source: value,
                        options: { type: 3 }
                    }
                ]
            });
        }
    };

    componentWillUnmount = () => {
        const { name, removeFieldError } = this.props;
        removeFieldError(name);
    };

    componentDidUpdate = ({ value: prevValue }) => {
        const { value, maxFiles = 1 } = this.props;

        if (
            (maxFiles > 1 && !areArraysEqual(value, prevValue)) ||
            (maxFiles === 1 && value !== prevValue)
        ) {
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

        if (required && !(value && value.length)) {
            addFieldError(name, 'This is a required field.');
        } else if (error) {
            removeFieldError(name);
        }
    };

    _getServerOptions = () => {
        return {
            url: FILE_API_URL,
            process: this._handleUpload,
            revert: this._handleRemove,
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

    _handleRemove = (s3Key, load) => {
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
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileUploadContainer);
