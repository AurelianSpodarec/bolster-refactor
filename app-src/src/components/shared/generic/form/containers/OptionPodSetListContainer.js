import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import OptionPodSetList from '../presentational/OptionsPodSetList';
import { usePrevious } from 'helpers/hooks';

const OptionPodSetListContainer = ({
    options,
    error,
    errorsVisible,
    selectedOptions,
    name,
    classes,
    allOptionsDisabled = false,
    hideDisabled = false,
    isNumberValues,
    required,
    addFieldError,
    removeFieldError,
    requiredMessage,
    handleChange,
}) => {
    const dispatch = useDispatch();
    const [showFieldError, setShowFieldError] = useState(false);
    const errorMessage = showFieldError || errorsVisible ? error : null;
    const prevProps = usePrevious({ selectedOptions });

    useEffect(() => {
        validate();
        if (prevProps.length !== selectedOptions.length) {
            validate();

            if (!showFieldError) setShowFieldError(true);
        }
    }, [selectedOptions]);

    const validate = () => {
        if (required && !selectedOptions.length) {
            dispatch(addFieldError(name, requiredMessage || 'This is a required field.'));
        } else if (error) dispatch(removeFieldError(name));
    };

    const onChange = (name, _, value) => {
        const formattedValue = isNumberValues ? parseInt(value) : value;

        const updatedValues = selectedOptions.includes(formattedValue)
            ? selectedOptions.filter(val => formattedValue !== val)
            : [...selectedOptions, formattedValue];
        handleChange(name, updatedValues);
    };

    return (
        <OptionPodSetList
            selectedOptions={selectedOptions}
            options={options}
            handleChange={onChange}
            error={errorMessage}
            name={name}
            classes={classes}
            allOptionsDisabled={allOptionsDisabled}
            hideDisabled={hideDisabled}
            isNumberValues={isNumberValues}
        />
    );
};

const mapStateToProps = (
    {
        shared: {
            fieldErrorsReducer: { fieldErrors, errorsVisible },
        },
    },
    ownProps,
) => ({
    error: fieldErrors[ownProps.name],
    errorsVisible,
});

const mapDispatchToProps = dispatch => ({
    addFieldError: (name, error) => dispatch(addFieldError(name, error)),
    removeFieldError: name => dispatch(removeFieldError(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionPodSetListContainer);
