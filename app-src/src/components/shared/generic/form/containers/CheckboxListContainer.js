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
            handleChange,
            error,
            errorsVisible,
            selectedOptions,
            name
        } = this.props;

        let errorMessage;
        if (showFieldError || errorsVisible) errorMessage = error;
        return (
            <CheckboxList
                selectedOptions={selectedOptions}
                options={options}
                handleChange={handleChange}
                error={errorMessage}
                name={name}
            />
        );
    }

    componentDidMount = () => {
        this._validate();
    };

    componentDidUpdate = ({ selectedOptions: prevCheckedValues }) => {
        const { selectedOptions } = this.props;
        const { showFieldError } = this.state;
        if (prevCheckedValues.length !== selectedOptions.length) {
            this._validate();

            if (!showFieldError) this.setState({ showFieldError: true });
        }
    };

    _validate = () => {
        const {
            name,
            error,
            required,
            addFieldError,
            removeFieldError,
            selectedOptions
        } = this.props;

        if (required && !selectedOptions.length) {
            addFieldError(name, 'This is a required field.');
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
)(CheckboxListContainer);
