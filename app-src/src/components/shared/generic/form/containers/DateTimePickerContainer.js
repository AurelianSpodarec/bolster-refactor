import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import DateTimePicker from '../presentational/DateTimePicker';

const DateTimePickerContainer = ({
    name,
    value,
    onChange,
    placeholder = 'Please select a date',
    required,
    onBlur = () => {},
    sizeClasses = 'size-lg-12',
    minDate,
    maxDate,
    errorsVisible,
    error,
    useUtc = false,
}) => {
    const dispatch = useDispatch();
    const [showFieldError, setShowFieldError] = useState(false);

    const errorMessage = showFieldError || errorsVisible ? error : null;

    useEffect(() => {
        validate(value);
    }, [value]);

    return (
        <DateTimePicker
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onBlur={handleBlur}
            minDate={minDate}
            maxDate={maxDate}
            sizeClasses={sizeClasses}
            error={errorMessage}
            useUtc={useUtc}
        />
    );

    function validate(val) {
        if (required && !val) {
            dispatch(addFieldError(name, 'This is a required field.'));
        } else if (error) {
            dispatch(removeFieldError(name));
        }
    }

    function handleBlur() {
        onBlur();
        setShowFieldError(true);
    }
};

const mapStateToProps = ({ shared: { fieldErrorsReducer } }, ownProps) => ({
    error: fieldErrorsReducer.fieldErrors[ownProps.name],
    errorsVisible: fieldErrorsReducer.errorsVisible,
});

export default connect(mapStateToProps)(DateTimePickerContainer);
