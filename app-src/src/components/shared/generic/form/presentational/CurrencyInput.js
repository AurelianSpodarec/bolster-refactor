import { preventNonNumericalInput } from 'helpers/generic';
import React from 'react';
import withFieldValidation from '../hocs/withFieldValidation';

const CurrencyInput = ({
    name,
    disabled = false,
    value = null,
    onChange,
    placeholder = '-- Enter amount --',
    className = '',
}) => {
    return (
        <div className="size-lg-12">
            <input
                onKeyPress={preventNonNumericalInput} // Firefox
                disabled={disabled}
                className={`generic-input currency ${className}`}
                type="number"
                name={name}
                placeholder={placeholder}
                value={value}
                min="0.00"
                step="0.01"
                onChange={e => onChange(name, e.target.value.replace(/[^0-9.]/, ''))}
            />
        </div>
    );
};

export default withFieldValidation(CurrencyInput);
