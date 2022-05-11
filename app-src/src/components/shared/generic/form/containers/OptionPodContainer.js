import React, { useEffect } from 'react';
import OptionPod from '../presentational/OptionPod';
import { useDispatch, useSelector } from 'react-redux';
import addFieldError from '../../../../../actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from '../../../../../actions/shared/generic/fieldErrors/sync/removeFieldError';
import { usePrevious } from '../../../../../helpers/hooks';
import { selectFieldError } from '../../../../../selectors/shared/fieldErrors';

const OptionPodContainer = ({
    name,
    checked,
    onChange,
    icon = '',
    svgIconComponent: SvgIconComponent,
    pathStroke = false,
    error,
    errorsVisible = true,
    required,
}) => {
    const dispatch = useDispatch();
    const prevChecked = usePrevious(checked);
    const fieldError = useSelector(state => selectFieldError(state, name));

    const errorMessage = errorsVisible ? error || fieldError : null;

    useEffect(() => {
        validate();
    }, []);

    useEffect(() => {
        if (checked !== prevChecked) validate();
    }, [checked, prevChecked]);

    const validate = () => {
        if (required && !checked) {
            dispatch(addFieldError(name, 'This is a required field.'));
        } else if (error) {
            dispatch(removeFieldError(name));
        }
    };

    return (
        <OptionPod
            checked={checked}
            onChange={onChange}
            name={name}
            icon={icon}
            pathStroke={pathStroke}
            error={errorMessage}
            svgIconComponent={SvgIconComponent}
        />
    );
};

export default OptionPodContainer;
