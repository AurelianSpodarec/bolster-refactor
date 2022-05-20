import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import OptionPodSet from '../presentational/OptionPodSet';
import usePrevious from 'hooks/usePrevious';

const OptionPodSetContainer = ({
    removeFieldError,
    addFieldError,
    required,
    checked,
    name,
    errorsVisible,
    disabled,
    error,
    id,
    text,
    value,
    classes,
    fromList,
    hideDisabled,
    keepTextColorOnDisable,
    handleChange,
}) => {
    const dispatch = useDispatch();
    const [showFieldError, setShowFieldError] = useState(false);
    const errorMessage = showFieldError || errorsVisible ? error : null;
    const prevProps = usePrevious({ checked });

    useEffect(() => {
        validate();
        if (checked !== prevProps) {
            validate();
            if (!showFieldError) setShowFieldError(true);
        }
    }, [checked]);

    const onChange = ({ target: { name, checked, value } }) => {
        handleChange(name, checked, value);
        validate();
    };

    const validate = () => {
        if (required && !checked) {
            dispatch(addFieldError(name, 'This is a required field.'));
        } else if (error) dispatch(removeFieldError(name));
    };

    return (
        <OptionPodSet
            checked={checked}
            handleChange={onChange}
            name={name}
            id={id}
            error={errorMessage}
            disabled={disabled}
            text={text}
            value={value}
            classes={classes}
            fromList={fromList}
            hideDisabled={hideDisabled}
            keepTextColorOnDisable={keepTextColorOnDisable}
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

export default connect(mapStateToProps, mapDispatchToProps)(OptionPodSetContainer);
