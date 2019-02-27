import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/generic/sync/fieldErrors/addFieldError';
import removeFieldError from 'actions/generic/sync/fieldErrors/removeFieldError';

import TextInput from '../presentational/TextInput';

class TextInputContianer extends Component {
    render() {
        const {
            value,
            name,
            type = 'text',
            placeholder,
            handleChange,
            error
        } = this.props;

        return (
            <TextInput
                value={value}
                name={name}
                type={type}
                placeholder={placeholder}
                handleChange={handleChange}
                handleBlur={this.handleBlur}
                error={error}
            />
        );
    }

    handleBlur = e => {
        const { name, value } = e.target;

        const { error, required, validate = () => {} } = this.props;
        const validateError = validate(value);

        if (required && !(value && value.length)) {
            this.props.addFieldError(name, 'This is a required field.');
        } else if (validateError && validateError.length) {
            this.props.addFieldError(name, validateError);
        } else if (error) {
            this.props.removeFieldError(name);
        }
    };
}

const mapStateToProps = (state, ownProps) => ({
    error: state.genericReducers.fieldErrors[ownProps.name]
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
)(TextInputContianer);
