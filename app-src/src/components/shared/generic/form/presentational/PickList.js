import React from 'react';

const PickList = ({
    name,
    error,
    handleChange = () => {},
    onBlur = () => {},
    value = [],
    options = [],
    disabled = false,
    classes = '',
}) => {
    return (
        <div className={`pick-list ${disabled && 'disabled'} ${classes} size-lg-12`}>
            <div className="options">
                {options.map(({ value: val, text }) => {
                    const selected = value.indexOf(val) >= 0;
                    return (
                        <button
                            key={val}
                            type="button"
                            onClick={() => handleChange(val)}
                            onBlur={onBlur}
                            className={`option ${selected ? 'selected' : ''}`}
                            disabled={disabled}
                        >
                            {text}
                        </button>
                    );
                })}
            </div>
            {!!(error && error.length) && <p className="error red-text text-accent-4">{error}</p>}
        </div>
    );
};

export default PickList;
