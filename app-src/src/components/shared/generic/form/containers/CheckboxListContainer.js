import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import CheckboxList from '../presentational/CheckboxList';

class CheckboxListContainer extends Component {
    state = {
        showFieldError: false
    };
    render() {
        const { showFieldError } = this.state;
        const {
            options,
            error,
            errorsVisible,
            selectedOptions,
            name
        } = this.props;

        const errorMessage = showFieldError || errorsVisible ? error : null;
        return (
            <CheckboxList
                selectedOptions={selectedOptions}
                options={options}
                handleChange={this.handleChange}
                error={errorMessage}
                name={name}
            />
        );
    }

    componentDidMount = () => this._validate();

    componentDidUpdate = ({ selectedOptions: prevCheckedValues }) => {
        const { selectedOptions } = this.props;
        const { showFieldError } = this.state;
        if (prevCheckedValues.length !== selectedOptions.length) {
            this._validate();

            if (!showFieldError) this.setState({ showFieldError: true });
        }
    };

    handleChange = (name, _, value) => {
        const { selectedOptions, handleChange } = this.props;
        const updatedValues = selectedOptions.includes(value)
            ? selectedOptions.filter(val => value !== val)
            : [...selectedOptions, value];
        handleChange(name, updatedValues);
    };

    _validate = () => {
        const {
            name,
            error,
            required,
            addFieldError,
            removeFieldError,
            selectedOptions,
            requiredMessage
        } = this.props;

        if (required && !selectedOptions.length) {
            addFieldError(name, requiredMessage || 'This is a required field.');
        } else if (error) removeFieldError(name);
    };
}

const mapStateToProps = (
    {
        shared: {
            fieldErrorsReducer: { fieldErrors, errorsVisible }
        }
    },
    ownProps
) => ({
    error: fieldErrors[ownProps.name],
    errorsVisible
});

const mapDispatchToProps = dispatch => ({
    addFieldError: (name, error) => dispatch(addFieldError(name, error)),
    removeFieldError: name => dispatch(removeFieldError(name))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckboxListContainer);
