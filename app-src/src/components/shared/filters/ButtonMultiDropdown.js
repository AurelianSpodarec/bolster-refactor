import React, { useRef, useState } from 'react';

import useGetFixedElementPosition from 'hooks/useGetFixedElementPosition';
import useClickOutside from 'hooks/useClickOutside';

import ActionButton from '../generic/button/presentational/ActionButton';

const ButtonMultiDropdown = ({
    buttonText = '',
    name,
    options = [],
    selectedOptions = [],
    handleChange = () => {},
    isNumberValues,
    scrollElementID,
}) => {
    const [showList, setShowList] = useState(false);

    const buttonRef = useRef(null);

    const { positionStyles, isPositioned } = useGetFixedElementPosition(
        buttonRef,
        10,
        showList,
        scrollElementID,
    );

    const closeMenu = () => {
        setShowList(false);
    };

    const listRef = useClickOutside(closeMenu);

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
                ref={listRef}
                className="button-dropdown-list"
                style={{ display: showList && isPositioned ? 'block' : 'none', ...positionStyles }}
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
