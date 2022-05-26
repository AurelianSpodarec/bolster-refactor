import React, { useRef, useState } from 'react';

import { ReactComponent as TickIcon } from '_content/images/icons/tick.svg';

import useGetFixedElementPosition from 'hooks/useGetFixedElementPosition';
import useClickOutside from 'hooks/useClickOutside';

import ActionButton from '../generic/button/presentational/ActionButton';
import FlexWrapper from '../generic/flexWrapper/FlexWrapper';

const ButtonDropdown = ({
    buttonText = '',
    name,
    options = [],
    value,
    handleChange = () => {},
    scrollElementID,
    size = 'small',
    closeOnChange = true,
}) => {
    const [showList, setShowList] = useState(false);

    const buttonRef = useRef(null);

    const { positionStyles, isPositioned, isRight, isBottom } = useGetFixedElementPosition(
        buttonRef,
        20,
        showList,
        scrollElementID,
    );

    const closeMenu = () => {
        setShowList(false);
    };

    const listRef = useClickOutside(closeMenu);

    const optionLabels = options.reduce((acc, curr) => {
        acc[curr.value] = curr.label;
        return acc;
    }, {});

    return (
        <>
            <ActionButton
                text={!!value ? optionLabels[value] : buttonText}
                source="secondary"
                ambient="positive"
                onClick={() => setShowList(!showList)}
                forwardRef={buttonRef}
                size={size}
            />

            <div
                ref={listRef}
                className="button-dropdown-list"
                style={{ display: showList && isPositioned ? 'block' : 'none', ...positionStyles }}
            >
                <div
                    className={`triangle ${isRight ? 'right' : 'left'} ${
                        isBottom ? 'bottom' : 'top'
                    }`}
                />

                <div className="list-content">
                    {!!value && (
                        <button
                            className="dropdown-list-button"
                            onClick={() => _handleDeselectAll()}
                        >
                            <span className="text">Reset</span>
                        </button>
                    )}

                    {options.map(option => {
                        const isSelected = value === option.value;

                        return (
                            <button
                                className={`dropdown-list-button ${isSelected ? 'active' : ''}`}
                                key={option.value}
                                onClick={e => {
                                    e.preventDefault();
                                    _handleChange(option.value);
                                }}
                                disabled={option.isDisabled}
                            >
                                <span className="text">{option.label}</span>

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
        handleChange(name, value);
        if (closeOnChange) closeMenu();
    }

    function _handleDeselectAll() {
        handleChange(name, null);
    }
};

export default ButtonDropdown;
