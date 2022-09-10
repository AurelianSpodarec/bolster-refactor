import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import React, { useEffect } from 'react';
import ExtPhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';

const PhoneInput = ({
    type,
    name,
    placeholder = 'Enter phone number',
    classes,
    value,
    handleChange,
    handleBlur,
    charLimit,
    maxNum,
    disabled,
    required,
    validate = () => {},
}) => {
    const fieldError = useSelector(
        ({
            shared: {
                fieldErrorsReducer: {
                    fieldErrors: { [name]: error },
                },
            },
        }) => error,
    );
    const dispatch = useDispatch();
    const _validate = value => {
        const validateError = validate(value);
        if (required && !value) {
            dispatch(addFieldError(name, 'This is a required field.'));
        } else if (validateError && validateError.length) {
            dispatch(addFieldError(name, validateError));
        } else if (!isValidPhoneNumber(value)) {
            dispatch(addFieldError(name, 'Please enter a valid phone number.'));
        } else if (fieldError) {
            dispatch(removeFieldError(name));
        }
    };

    useEffect(() => {
        _validate(value);
    }, [value]);

    return (
        <>
            <ExtPhoneInput
                className={`generic-input ${classes}`}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={value => handleChange(name, value)}
                onBlur={handleBlur}
                maxLength={charLimit}
                max={maxNum}
                disabled={disabled}
                defaultCountry="GB"
                style={{ width: '100%' }}
            />
            {!!(fieldError && fieldError.length) && (
                <p className="error red-text text-accent-4">{fieldError}</p>
            )}
        </>
    );
};

export default PhoneInput;
