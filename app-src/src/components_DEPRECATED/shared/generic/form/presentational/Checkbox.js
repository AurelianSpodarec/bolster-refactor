import React from 'react';

const Checkbox = ({
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
    labelToTheLeft = false,
    forceOnOneLine = false,
}) => {
    const greyOutClass = keepTextColorOnDisable ? 'grey-out-input' : 'grey-out';
    const textClass = `text ${forceOnOneLine ? 'nowrap' : ''}`;

    return (
        <div
            className={`checkbox ${disabled ? `left ${greyOutClass}` : ''} ${
                hideDisabled && disabled ? 'hide' : ''
            } ${classes} ${labelToTheLeft ? 'label-left' : ''}`}
        >
            <input
                id={name}
                onChange={handleChange}
                type="checkbox"
                value={value}
                checked={checked}
                name={name}
                disabled={disabled}
            />
            <label
                htmlFor={name}
                // ? ## needs styling for disabled ##
                // style={disabled ? { color: 'grey' } : {}}
            >
                {text.length ? (
                    <span className={textClass}>{text}</span>
                ) : (
                    <span className={textClass}>&nbsp;</span>
                )}
                <span className="outer">
                    <span className="inner" />
                </span>
            </label>
            {!!(error && error.length && !fromList) && (
                <p className="error red-text text-accent-4">{error}</p>
            )}
        </div>
    );
};

export default Checkbox;
