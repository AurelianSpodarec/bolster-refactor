import React, { useEffect, useState } from 'react';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { connect, useDispatch } from 'react-redux';

import DatePickerPresentational from '../presentational/DatePicker';

const DatePickerContainer = ({
    selected,
    onChange,
    name,
    placeholderText = `Please select ${name}`,
    required,
    onBlur = () => {},
    sizeClasses = 'size-lg-12',
    minDate,
    maxDate,
    showTimeSelect = false,
    isIE10,
    errorsVisible,
    error,
}) => {
    const dispatch = useDispatch();
    const [showFieldError, setShowFieldError] = useState(false);

    const errorMessage = showFieldError || errorsVisible ? error : null;

    useEffect(() => {
        validate(selected);
    }, [selected]);

    return (
        <DatePickerPresentational
            name={name}
            selected={selected}
            onChange={onChange}
            placeholderText={placeholderText}
            required={required}
            onBlur={handleBlur}
            minDate={minDate}
            maxDate={maxDate}
            showTimeSelect={showTimeSelect}
            sizeClasses={sizeClasses}
            isIE10={isIE10}
            error={errorMessage}
        ></DatePickerPresentational>
    );

    function validate(value) {
        if (required && !value) {
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

const mapStateToProps = (
    {
        shared: {
            isIE10Reducer: { isIE10 },
            fieldErrorsReducer,
        },
    },
    ownProps,
) => ({
    isIE10,
    error: fieldErrorsReducer.fieldErrors[ownProps.name],
    errorsVisible: fieldErrorsReducer.errorsVisible,
});

export default connect(mapStateToProps)(DatePickerContainer);
