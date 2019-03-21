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
                handleAddFile={this.handleAddFile}
                handleRemoveFile={this.handleRemoveFile}
                error={errorMessage}
            />
        );
    }

    handleAddFile = (err, data) => {
        const { name, handleChange } = this.props;
        console.log(data.file);
        if (!err) {
            this._getBase64(data.file)
                // .then(base64 => handleChange(name, base64))
                .catch();
        }
    };

    handleRemoveFile = () => {
        const { name, handleChange } = this.props;
        // handleChange(name, '');
    };

    _validate = file => {
        const {
            name,
            allowedTypes,
            error,
            required,
            addFieldError,
            removeFieldError
        } = this.props;

        if (required && !file) {
            addFieldError(name, 'This is a required field.');
        } else if (!(allowedTypes && allowedTypes.length) || allowedTypes.some){

        } else if (error) {
            removeFieldError(name);
        }
    };

    _validateTypes = (fileType, types) {
        if (!(types && types.length))
    }

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
