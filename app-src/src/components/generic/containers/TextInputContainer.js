import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/generic/sync/fieldErrors/addFieldError';
import removeFieldError from 'actions/generic/sync/fieldErrors/removeFieldError';

import TextInput from '../presentational/TextInput';

class TextInputContianer extends Component {
    state = {
        showFieldError: false
    };

    render() {
        const { showFieldError } = this.state;
        const {
            value,
            name,
            type = 'text',
            placeholder,
            error,
            errorsVisible
        } = this.props;

        let errorMessage;
        if (showFieldError || errorsVisible) errorMessage = error;

        return (
            <TextInput
                value={value}
                name={name}
                type={type}
                placeholder={placeholder}
                handleChange={this.handleChange}
                handleBlur={this.handleBlur}
                error={errorMessage}
            />
        );
    }

    componentDidMount = () => {
        this._validate(this.props.value);
    };

    handleChange = e => {
        this.props.handleChange(e);
        this._validate(e.target.value);
    };

    handleBlur = () => {
        this.setState({
            ...this.state,
            showFieldError: true
        });
    };

    _validate = value => {
        const { name, error, required, validate = () => {} } = this.props;
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
    error: state.genericReducers.fieldErrors.fieldErrors[ownProps.name],
    errorsVisible: state.genericReducers.fieldErrors.errorsVisible
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
