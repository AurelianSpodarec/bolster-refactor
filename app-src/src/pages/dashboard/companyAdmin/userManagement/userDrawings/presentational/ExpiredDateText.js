import moment from 'moment';
import React from 'react';

const ExpiredDateText = ({ expiresOn, isExpired }) => {
    return (
        <span className={`expired-date-text ${isExpired ? 'expired' : ''}`}>
            <strong>Expiry Date:</strong> {`${moment(expiresOn).format('DD/MM/YYYY')}`}
        </span>
    );
};

export default ExpiredDateText;
