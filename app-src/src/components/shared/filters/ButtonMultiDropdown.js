import React, { useState } from 'react';

import ActionButton from '../generic/button/presentational/ActionButton';

const ButtonMultiDropdown = ({
    buttonText = '',
    name,
    options = [],
    selectedOptions = [],
    handleChange = () => {},
    isNumberValues,
}) => {
    const [showList, setShowList] = useState(false);

    return (
        <>
            <ActionButton
                text={buttonText}
                source="secondary"
                ambient="positive"
                onClick={() => setShowList(!showList)}
            />

            <div className="button-dropdown-list" style={{ display: showList ? 'block' : 'none' }}>
                <div className="list-content">
                    {options.map(option => (
                        <button key={option.value} onClick={() => _handleChange(option.value)}>
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );

    function _handleChange(value) {
        const formattedValue = isNumberValues ? parseInt(value) : value;

        const updatedValues = selectedOptions.includes(formattedValue)
            ? selectedOptions.filter(val => formattedValue !== val)
            : [...selectedOptions, formattedValue];
        handleChange(name, updatedValues);
    }
};

export default ButtonMultiDropdown;
