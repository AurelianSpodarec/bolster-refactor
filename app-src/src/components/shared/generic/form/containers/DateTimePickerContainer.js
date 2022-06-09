import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { selectFieldError, selectFieldErrorsVisible } from 'selectors/shared/fieldErrors';

import DateTimePicker from '../presentational/DateTimePicker';

const DateTimePickerContainer = ({
    name,
    value,
    onChange,
    placeholder = 'Please select a date',
    required,
    onBlur = () => {},
    sizeClasses = 'size-lg-12',
    useUtc = false,
    fixPickerToTop = false,
}) => {
    const dispatch = useDispatch();
    const error = useSelector(state => selectFieldError(state, name));
    const errorsVisible = useSelector(selectFieldErrorsVisible);
    const [showFieldError, setShowFieldError] = useState(false);

    const errorMessage = showFieldError || errorsVisible ? error : null;

    useEffect(() => {
        validate(value);
    }, [value]);

    return (
        <DateTimePicker
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onBlur={handleBlur}
            sizeClasses={sizeClasses}
            error={errorMessage}
            useUtc={useUtc}
            fixPickerToTop={fixPickerToTop}
        />
    );

    function validate(val) {
        if (val && typeof val !== 'object') {
            dispatch(addFieldError(name, 'This is not a valid date.'));
            return;
        }

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

export default DateTimePickerContainer;
