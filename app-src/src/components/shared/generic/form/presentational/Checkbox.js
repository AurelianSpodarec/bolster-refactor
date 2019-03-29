import React from 'react';

const Checkbox = ({ item, checked, handleMultiselect, name }) => {
    return (
        <div className="size-lg-4">
            <input
                onChange={handleMultiselect}
                type="checkbox"
                id={item.name}
                checked={checked}
                name={name}
            />
            <label htmlFor={name}>{name}</label>
        </div>
    );
};

export default Checkbox;
