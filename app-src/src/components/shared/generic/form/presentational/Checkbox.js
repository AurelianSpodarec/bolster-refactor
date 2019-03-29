import React from 'react';

const Checkbox = ({ item, checked, handleMultiselect, name }) => {
    return (
        <>
            <input
                onChange={handleMultiselect}
                type="checkbox"
                id={item.name}
                checked={checked}
                name={name}
            />
            <label htmlFor={name}>{name}</label>
        </>
    );
};

export default Checkbox;
