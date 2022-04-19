import React, { useRef, useState } from 'react';

import { ReactComponent as TickIcon } from '_content/images/icons/tick.svg';

import useGetFixedElementPosition from 'hooks/useGetFixedElementPosition';
import useClickOutside from 'hooks/useClickOutside';

import ActionButton from '../generic/button/presentational/ActionButton';
import FlexWrapper from '../generic/flexWrapper/FlexWrapper';

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

    const isAllSelected = options.every(opt => selectedOptions.includes(opt.value));

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
                    <button
                        className="dropdown-list-button"
                        onClick={() => {
                            if (isAllSelected) {
                                _handleDeselectAll();
                            } else {
                                _handleSelectAll();
                            }
                        }}
                    >
                        <span className="text">{isAllSelected ? 'Deselect' : 'Select'} All</span>
                    </button>

                    {options.map(({ text, value, isDisabled }) => {
                        const isSelected = selectedOptions.includes(value);

                        return (
                            <button
                                className={`dropdown-list-button ${isSelected ? 'active' : ''}`}
                                key={value}
                                onClick={() => _handleChange(value)}
                                disabled={isDisabled}
                            >
                                <span className="text">{text}</span>

                                {isSelected && (
                                    <FlexWrapper autoWidth align="center">
                                        <TickIcon className="icon" />
                                    </FlexWrapper>
                                )}
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

    function _handleSelectAll() {
        const updatedValues = options.map(opt => opt.value);
        handleChange(name, updatedValues);
    }

    function _handleDeselectAll() {
        handleChange(name, []);
    }
};

export default ButtonMultiDropdown;
