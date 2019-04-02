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
            errorsVisible
        } = this.props;

        let errorMessage;
        if (showFieldError || errorsVisible) errorMessage = error;

        return (
            <Dropdown
                placeholder={placeholder}
                name={name}
                options={options}
                selectedOption={selectedOption}
                withoutPlaceholder={withoutPlaceholder}
                handleChange={this.handleChange}
                handleBlur={this.handleBlur}
                error={errorMessage}
            />
        );
    }

    componentDidMount = () => {
        const { selectedOption } = this.props;
        this._validate(selectedOption ? selectedOption.value : '');
    };

    componentWillUnmount = () => {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    };

    handleChange = e => {
        this.props.handleChange(e);
        this._validate(e.target.value);
    };

    handleBlur = () => {
        if (!this.state.showFieldError) this.setState({ showFieldError: true });
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
