import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { FILE_API_URL, RAW_S3_STORAGE_URL } from 'config';
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
        const errorMessage = showFieldError || errorsVisible ? error : null;

        return (
            <FileUpload
                updateRef={ref => (this.pond = ref)}
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
        const { value } = this.props;
        if (value && value.length) this._setFiles(value);

        this._validate();
    };

    componentWillUnmount = () => {
        const { name, removeFieldError, fileUploadFinish } = this.props;
        removeFieldError(name);
        // ensures the file upload is set to 0 if the page is navigated away from before files have finished uploading
        fileUploadFinish('close');
    };

    componentDidUpdate = ({ value: prevValue }) => {
        const { value } = this.props;
        const hasArrChanged =
            Array.isArray(value) && !areArraysEqual(value, prevValue);
        const hasStringChanged =
            typeof value === 'string' && value !== prevValue;

        if (hasArrChanged || hasStringChanged) this._validate(value);

        if (!prevValue && value) this._setFiles(value);
    };

    _setFiles = value => {
        const formatFile = value => ({
            source: `${RAW_S3_STORAGE_URL}/${value}`,
            options: { type: 'local' }
        });
        const files = Array.isArray(value)
            ? value.map(formatFile)
            : [formatFile(value)];
        this.setState({ files });
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

        if (required && !(value && value.length))
            addFieldError(name, 'This is a required field.');
        else if (error) removeFieldError(name);
    };

    _getServerOptions = () => ({
        url: FILE_API_URL,
        process: this._handleUpload,
        revert: this._handleRevert,
        load: this._handleFileLoad,
        remove: this._handleRemove,
        restore: null,
        fetch: null
    });

    _handleRemove = (source = '', load, error) => {
        try {
            const s3Key = source.replace(`${RAW_S3_STORAGE_URL}/`, '');
            const { handleChange, name } = this.props;
            handleChange(name, s3Key);
            load();
        } catch {
            error('Something went wrong.');
        }
    };

    handleFileUploadStart = () => this.props.fileUploadStart();

    handleFileUploadFinish = () => {
        this._validate();
        this.props.fileUploadFinish();
    };

    _handleFileLoad = (source = '', load, error) => {
        var myRequest = new Request(source);
        fetch(myRequest)
            .then(function(response) {
                response.blob().then(function(myBlob) {
                    load(myBlob);
                });
            })
            .catch(function() {
                error('Something went wrong.');
            });
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
        this.handleFileUploadStart();
        const formData = new FormData();
        formData.append(fieldName, file, file.name);

        const { CancelToken } = axios;
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

        const { skipTemp = false } = this.props;
        axios
            .post(`${FILE_API_URL}?skipTemp=${skipTemp}`, formData, config)
            .then(({ data: { s3Key } }) => {
                const { name, handleChange } = this.props;
                handleChange(name, s3Key);
                load(s3Key);
                this.handleFileUploadFinish();
            })
            .catch(() => {
                this.handleFileUploadFinish();
                return error('Something went wrong');
            });

        return {
            abort: () => {
                source.cancel('Upload canceled');
                abort();
            }
        };
    };

    handleUpdateFiles = fileItems => {
        this.setState({ files: fileItems.map(({ file }) => file) });
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
    addFieldError: (name, error) => dispatch(addFieldError(name, error)),
    removeFieldError: name => dispatch(removeFieldError(name)),
    fileUploadStart: () => dispatch(fileUploadStart()),
    fileUploadFinish: close => dispatch(fileUploadFinish(close))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileUploadContainer);
