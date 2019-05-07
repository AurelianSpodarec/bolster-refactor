import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import TextInput from '../presentational/TextInput';
import { EMAIL_REGEX } from 'helpers/regex';

class TextInputContainer extends Component {
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
            classes = '',
            error,
            errorsVisible,
            charLimit,
            maxNum
        } = this.props;

        let errorMessage;
        if (showFieldError || errorsVisible) errorMessage = error;

        return (
            <TextInput
                value={value || ''}
                name={name}
                classes={classes}
                type={type}
                placeholder={placeholder}
                handleChange={this.handleChange}
                handleBlur={this.handleBlur}
                error={errorMessage}
                charLimit={charLimit}
                maxNum={maxNum}
            />
        );
    }

    componentDidMount = () => {
        this._validate(this.props.value);
    };

    componentDidUpdate = ({ value: prevValue }) => {
        const { value } = this.props;
        if (prevValue !== value) this._validate(value);
    };

    componentWillUnmount = () => {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    };

    handleChange = ({ target: { name, value } }) => {
        this.props.handleChange(name, value);
    };

    handleBlur = () => {
        this.setState({
            showFieldError: true
        });
    };

    _validate = value => {
        const {
            name,
            type,
            error,
            required,
            validate = () => {},
            addFieldError,
            removeFieldError
        } = this.props;
        const validateError = validate(value);
        const isNumber = typeof value === 'number';

        if (required && (!(value && value.length) && !isNumber)) {
            addFieldError(name, 'This is a required field.');
        } else if (type === 'email' && !this._valdateEmail(value)) {
            addFieldError(name, 'This is not a valid email.');
        } else if (validateError && validateError.length) {
            addFieldError(name, validateError);
        } else if (error) {
            removeFieldError(name);
        }
    };

    _valdateEmail = value => EMAIL_REGEX.test(value);
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
)(TextInputContainer);
