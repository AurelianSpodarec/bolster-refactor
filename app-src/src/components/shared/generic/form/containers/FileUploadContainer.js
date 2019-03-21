import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/generic/fieldErrors/sync/removeFieldError';

import FileUpload from '../presentational/FileUpload';

class FileUploadContainer extends Component {
    state = {
        showFieldError: false
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

    handleBeforeAddFile = ({ file }) => {
        const {
            name,
            error,
            allowedTypes,
            addFieldError,
            removeFieldError
        } = this.props;

        if (!(allowedTypes && allowedTypes.length)) return true;
        const isValid = allowedTypes.some(type =>
            type.toLowerCase().includes(file.type.toLowerCase())
        );

        if (!isValid) {
            addFieldError(name, 'This file type is not allowed.');
            this._showFieldError();
            return false;
        } else if (error) {
            removeFieldError(name);
        }
    };

    handleAddFile = (err, { file }) => {
        // const { name, handleChange } = this.props;
        this._showFieldError();
        if (!err) {
            this._getBase64(file);
            // .then(base64 => handleChange(name, base64))
            // .catch();
        }
    };

    handleRemoveFile = () => {
        // const { name, handleChange } = this.props;
        // handleChange(name, '');
        this._validateRequired();
        this._showFieldError();
    };

    _showFieldError = () => {
        this.setState({
            ...this.state,
            showFieldError: true
        });
    };

    _validateRequired = file => {
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
