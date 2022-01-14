import React from 'react';

import moment from 'moment';

const SystemMessagesListItem = ({ message: { id, createdOn, message } }) => {
    return (
        <div key={id} className="message-wrapper">
            <div className="title-wrapper">
                <div className="date-wrapper">
                    <span className="date">{moment(createdOn).format('DD/MM/YY - hh:mm')}</span>
                </div>
                <i className="fas fa-times-circle close-icon" />
            </div>

            <div>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default SystemMessagesListItem;
