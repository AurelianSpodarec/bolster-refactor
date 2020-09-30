import React, { useState } from 'react';
import ZoneSelectItem from './ZoneSelectItem';

const ZoneSelect = ({ options, title, onSubmit }) => {
    const [selected, updateSelected] = useState([]);
    return (
        <div className="pin-selection-box zones-box">
            <h3
                className={`${
                    title === 'Included' ? 'included' : 'excluded'
                } size-lg-11`}
            >
                {title}
            </h3>
            {title === 'Included' && _renderButton()}
            <div
                className={`content ${
                    title === 'Included' ? 'included' : 'excluded'
                } size-lg-11`}
            >
                {options.map(opt => (
                    <ZoneSelectItem
                        key={opt.value}
                        onClick={_handleClick}
                        option={opt}
                        active={selected.includes(opt.value)}
                    />
                ))}
            </div>
            {title === 'Excluded' && _renderButton()}
        </div>
    );

    function _handleClick(value) {
        let updated = [];

        if (selected.includes(value)) {
            updated = selected.filter(x => x !== value);
        } else {
            updated = [...selected, value];
        }

        updateSelected(updated);
    }

    function _handleSubmit(e) {
        e.preventDefault();
        updateSelected([]);
        onSubmit(selected);
    }

    function _renderButton() {
        const direction = title === 'Included' ? 'left' : 'right';
        return (
            <div className={`pin-selection-buttons zone-buttons ${direction}`}>
                <button
                    type="button"
                    className="button icon-only"
                    onClick={_handleSubmit}
                >
                    <i className={`far fa-long-arrow-${direction}`} />
                </button>
            </div>
        );
    }
};

export default ZoneSelect;
