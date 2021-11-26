import React from 'react';
import Switch from '../presentational/Switch';

const SwitchContainer = ({
    checked,
    disabled = false,
    handleChange,
    value,
    name,
    text
}) => {
    return (
        <Switch
            checked={checked}
            disabled={disabled}
            handleChange={handleSwitchChange}
            handleBlur={this.handleBlur}
            name={name}
            text={text}
            value={value}
        />
    );

    function handleSwitchChange({ target: { name, value } }) {
        handleChange(name, value);
    }
};

export default SwitchContainer;
