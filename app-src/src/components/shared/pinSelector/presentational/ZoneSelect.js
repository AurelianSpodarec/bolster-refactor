import React, { useState } from 'react';
import ZoneSelectItem from './ZoneSelectItem';

const ZoneSelect = ({ options, title, onSubmit }) => {
    const [selected, updateSelected] = useState([]);
    return (
        <div className="pin-selection-box">
            <h3>{title}</h3>
            {title === 'Included' && _renderButton()}
            <div className="content size-lg-10">
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
            <div className="size-lg-1">
                <div className="pin-selection-buttons">
                    <button
                        type="button"
                        className=" icon-only"
                        onClick={_handleSubmit}
                    >
                        <i className={`far fa-long-arrow-${direction}`} />
                    </button>
                </div>
            </div>
        );
    }
};

export default ZoneSelect;
