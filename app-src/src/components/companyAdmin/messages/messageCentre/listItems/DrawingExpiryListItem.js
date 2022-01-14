import React from 'react';

import moment from 'moment';

const DrawingExpiryListItem = ({
    message: { id, createdByUserFirstName, createdByUserLastName, createdOn, message },
}) => {
    return (
        <div key={id} className="message-wrapper">
            <div className="title-wrapper">
                <h3 className="title">{`${createdByUserFirstName} ${createdByUserLastName}`}</h3>

                <div className="date-wrapper">
                    <span className="date">{moment(createdOn).format('DD/MM/YY - hh:mm')}</span>
                    <i className="fas fa-times-circle close-icon" />
                </div>
            </div>

            <div>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default DrawingExpiryListItem;
