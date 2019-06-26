import React from 'react';
import withFieldValidation from '../hocs/withFieldValidation';

const CurrencyInput = ({
    name,
    disabled = false,
    value = null,
    onChange,
    showError,
    placeholder = '-- select option --',
    omitPlaceholder = false
}) => {
    return (
        <div className="size-lg-12">
            <input
                disabled={disabled}
                className={'generic-input currency'}
                type="number"
                name={name}
                placeholder={placeholder}
                value={value}
                min="0.00"
                step="0.01"
                onChange={e => onChange(name, e.target.value)}
            />
        </div>
    );
};

export default withFieldValidation(CurrencyInput);
