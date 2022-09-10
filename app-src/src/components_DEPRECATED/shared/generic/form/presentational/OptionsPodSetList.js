import React from 'react';
import OptionPodSetContainer from '../containers/OptionPodSetContainer';

const OptionPodSetList = ({
    options,
    selectedOptions = [],
    handleChange,
    name,
    error,
    classes,
    allOptionsDisabled,
    hideDisabled,
    isNumberValues,
}) => (
    <div className={'option-pod-set-list size-lg-12'}>
        {options &&
            options.map(({ text, value, disabled }) => (
                <OptionPodSetContainer
                    key={`${text}${value}`}
                    value={value}
                    name={name}
                    text={text}
                    disabled={disabled || allOptionsDisabled}
                    checked={
                        selectedOptions.includes(isNumberValues ? value : String(value)) &&
                        !disabled
                    }
                    handleChange={handleChange}
                    classes={classes}
                    fromList
                    hideDisabled={hideDisabled}
                />
            ))}
        {error && error.length && <p className="error red-text text-accent-4">{error}</p>}
    </div>
);

export default OptionPodSetList;
