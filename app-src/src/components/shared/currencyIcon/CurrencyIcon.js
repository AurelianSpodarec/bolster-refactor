import React from 'react';

const CurrencyIcon = ({ currency = '£' }) => {
    return (
        <div className="currency-icon-circle">
            <p>{currency}</p>
        </div>
    );
};

export default CurrencyIcon;
