import React, { useRef, useState } from 'react';

import useGetFixedElementPosition from 'hooks/useGetFixedElementPosition';

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

    const buttonRef = useRef(null);

    const positionStyles = useGetFixedElementPosition(buttonRef, 10);

    return (
        <>
            <ActionButton
                text={buttonText}
                source="secondary"
                ambient="positive"
                onClick={() => setShowList(!showList)}
                forwardRef={buttonRef}
            />

            <div
                className="button-dropdown-list"
                style={{ display: showList ? 'block' : 'none', ...positionStyles }}
            >
                <div className="list-content">
                    {options.map(({ text, value, isDisabled }) => {
                        const isSelected = selectedOptions.includes(value);

                        return (
                            <button
                                className={isSelected ? 'active' : ''}
                                key={value}
                                onClick={() => _handleChange(value)}
                                disabled={isDisabled}
                            >
                                {text}
                            </button>
                        );
                    })}
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
