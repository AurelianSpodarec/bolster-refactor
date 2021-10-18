import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import PickList from '../presentational/PickList';

const PickListContainer = ({
    name,
    options,
    handleChange,
    validate = () => {},
    disabled = false,
    classes = '',
    value = [],
    required = false,
    error,
    errorsVisible,
    addFieldError,
    removeFieldError,
}) => {
    const _validate = () => {
        const validateError = validate(value);
        if (required && value.length === 0) {
            addFieldError(name, 'This is a required field.');
        } else if (validateError && validateError.length) {
            addFieldError(name, validateError);
        } else if (error) {
            removeFieldError(name);
        }
    };

    const _handleChange = val => {
        const newValue = [...value];
        const index = newValue.indexOf(val);

        if (index >= 0) newValue.splice(index, 1);
        else newValue.push(val);

        handleChange(name, newValue);
    };

    useEffect(() => _validate(), [value, _validate]);

    return (
        <PickList
            name={name}
            options={options}
            error={errorsVisible ? error : null}
            handleChange={_handleChange}
            onBlur={() => _validate()}
            value={value}
            disabled={disabled}
            classes={classes}
        />
    );
};

const mapStateToProps = ({ shared: { fieldErrorsReducer } }, ownProps) => ({
    error: fieldErrorsReducer.fieldErrors[ownProps.name],
    errorsVisible: fieldErrorsReducer.errorsVisible,
});

const mapDispatchToProps = dispatch => ({
    addFieldError: (name, error) => dispatch(addFieldError(name, error)),
    removeFieldError: name => dispatch(removeFieldError(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PickListContainer);
