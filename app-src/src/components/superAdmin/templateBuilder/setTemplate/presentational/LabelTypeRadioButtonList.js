import React from 'react';

import LabelTypeRadioButton from './LabelTypeRadioButton';

const LabelTypeRadioButtonList = ({
    options,
    value,
    handleInputChange,
    name,
    error
}) => (
    <div className="checkbox-list size-lg-12">
        {options &&
            options.map(opt => (
                <LabelTypeRadioButton
                    key={`${opt.text}_${opt.value}`}
                    value={opt.value}
                    name={name}
                    text={opt.text}
                    disabled={opt.disabled}
                    checked={opt.value === value && !opt.disabled}
                    handleInputChange={handleInputChange}
                />
            ))}
        {error && error.length && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </div>
);

export default LabelTypeRadioButtonList;
