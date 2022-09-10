import React from 'react';

const OptionPodSet = ({
    value = false,
    checked = false,
    handleChange,
    name,
    text = '',
    error,
    classes = '',
    disabled = false,
    fromList,
    hideDisabled = false,
    keepTextColorOnDisable,
}) => {
    const greyOutClass = keepTextColorOnDisable ? 'grey-out-input' : 'grey-out';

    return (
        <div
            className={`option-pod-set ${checked ? 'selected' : ''} ${
                disabled ? `left ${greyOutClass}` : ''
            } ${hideDisabled && disabled ? 'hide' : ''} ${classes}`}
        >
            <button
                id={name}
                onClick={handleChange}
                type="button"
                value={value}
                checked={checked}
                name={name}
                disabled={disabled}
            >
                {text && text}
            </button>

            {!!(error && error.length && !fromList) && (
                <p className="error red-text text-accent-4">{error}</p>
            )}
        </div>
    );
};

export default OptionPodSet;
