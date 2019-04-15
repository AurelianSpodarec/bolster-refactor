import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import TextArea from '../presentational/TextArea';

class TextAreaContainer extends Component {
    state = {
        showFieldError: false
    };

    render() {
        const { showFieldError } = this.state;
        const {
            value,
            name,
            placeholder,
            error,
            errorsVisible,
            charLimit
        } = this.props;

        let errorMessage;
        if (showFieldError || errorsVisible) errorMessage = error;

        return (
            <TextArea
                value={value || ''}
                name={name}
                placeholder={placeholder}
                handleChange={this.handleChange}
                handleBlur={this.handleBlur}
                error={errorMessage}
                charLimit={charLimit}
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

    handleChange = e => {
        this.props.handleChange(e);
    };

    handleBlur = () => {
        this.setState({
            showFieldError: true
        });
    };

    _validate = value => {
        const {
            name,
            error,
            required,
            validate = () => {},
            addFieldError,
            removeFieldError
        } = this.props;
        const validateError = validate(value);

        if (required && !(value && value.length)) {
            addFieldError(name, 'This is a required field.');
        } else if (validateError && validateError.length) {
            addFieldError(name, validateError);
        } else if (error) {
            removeFieldError(name);
        }
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
)(TextAreaContainer);
