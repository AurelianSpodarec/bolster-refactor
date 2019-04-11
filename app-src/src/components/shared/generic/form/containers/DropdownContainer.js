import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import Dropdown from '../presentational/Dropdown';

class DropdownContainer extends Component {
    state = {
        showFieldError: false
    };

    render() {
        const { showFieldError } = this.state;
        const {
            placeholder,
            name,
            options,
            selectedOption,
            withoutPlaceholder,
            error,
            errorsVisible,
            disabled = false,
            required = false
        } = this.props;

        let errorMessage;
        if (showFieldError || errorsVisible) errorMessage = error;

        return (
            <Dropdown
                required={required}
                placeholder={placeholder}
                name={name}
                options={options}
                selectedOption={selectedOption}
                withoutPlaceholder={withoutPlaceholder}
                handleChange={this.handleChange}
                handleFocus={this.handleFocus}
                handleBlur={this.handleBlur}
                error={errorMessage}
                disabled={disabled}
            />
        );
    }

    componentDidMount = () => {
        const { selectedOption = {} } = this.props;
        this._validate(selectedOption.value);
    };

    componentDidUpdate = ({ selectedOption: prevOpt = {} }) => {
        const { selectedOption = {} } = this.props;
        if (selectedOption.value !== prevOpt.value) {
            this._validate(selectedOption.value);
        }
    };

    componentWillUnmount = () => {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    };

    handleChange = e => {
        this.props.handleChange(e);
        this._showFieldError();
    };

    handleBlur = () => {
        this._showFieldError();
    };

    // handleFocus = () => {
    //     const { showFieldError } = this.state;
    //     console.log('hihi');
    //     if (showFieldError) return;
    //     document.addEventListener('click', this._showFieldError);
    // };

    // handleClick = () => {
    //     const { showFieldError } = this.state;
    //     console.log('ghugugu');
    //     if (showFieldError) return;
    //     document.removeEventListener('click', this._showFieldError);
    // };

    _showFieldError = () => {
        const { showFieldError } = this.state;
        if (!showFieldError) this.setState({ showFieldError: true });
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
        console.log(required, value);
        if (required && !(value && (value.length || value > 0))) {
            addFieldError(name, 'This is a required field.');
        } else if (validateError && validateError.length) {
            addFieldError(name, validateError);
        } else if (error) {
            removeFieldError(name);
        }
    };

    _valdateEmail = value => {
        //eslint-disable-next-line
        var regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        return regEx.test(value);
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
)(DropdownContainer);
