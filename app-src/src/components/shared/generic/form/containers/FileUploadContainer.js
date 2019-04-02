import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import FileUpload from '../presentational/FileUpload';

class FileUploadContainer extends Component {
    state = {
        showFieldError: false,
        isAfterAdd: false
    };
    render() {
        const { showFieldError } = this.state;
        const { errorsVisible, error } = this.props;
        let errorMessage;
        if (showFieldError || errorsVisible) errorMessage = error;

        return (
            <FileUpload
                addRef={ref => (this.pond = ref)}
                handleBeforeAddFile={this.handleBeforeAddFile}
                handleAddFile={this.handleAddFile}
                handleRemoveFile={this.handleRemoveFile}
                error={errorMessage}
            />
        );
    }

    componentDidMount = () => {
        this._validate();
    };

    handleBeforeAddFile = ({ file }) => {
        const { name, error, addFieldError, removeFieldError } = this.props;
        this.setState({ showFieldError: true, isAfterAdd: false });

        if (!this._isFileTypeValid(file.type)) {
            addFieldError(name, 'Invalid file type.');
            return false;
        }
        if (error) removeFieldError(name);
    };

    handleAddFile = (err, { file }) => {
        const { name, handleChange } = this.props;
        this.setState({ isAfterAdd: true });

        if (!err) {
            this._getBase64(file)
                .then(res => res.split('base64,')[1])
                .then(base64 =>
                    handleChange(name, { encoded: base64, fileName: file.name })
                )
                .catch();
        }
    };

    handleRemoveFile = () => {
        const { name, handleChange } = this.props;
        const { isAfterAdd } = this.state;

        handleChange(name, {});
        if (isAfterAdd) this._validate();
    };

    _validate = file => {
        const {
            name,
            error,
            required,
            addFieldError,
            removeFieldError
        } = this.props;

        if (required && !file) {
            addFieldError(name, 'This is a required field.');
        } else if (error) {
            removeFieldError(name);
        }
    };

    _isFileTypeValid = fileType => {
        const { allowedTypes } = this.props;
        if (!(allowedTypes && allowedTypes.length)) return true;
        return allowedTypes.some(type =>
            fileType.toLowerCase().includes(type.toLowerCase())
        );
    };

    _getBase64 = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };
}

const mapStateToProps = ({ fieldErrorsReducer }, ownProps) => ({
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
