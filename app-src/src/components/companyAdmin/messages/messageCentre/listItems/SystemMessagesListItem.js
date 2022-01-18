import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import dismissSystemMessage from 'actions/companyAdmin/messageCentre/async/dismissSystemMessage';

const SystemMessagesListItem = ({ message: { id, createdOn, message } }) => {
    const dispatch = useDispatch();

    return (
        <div key={id} className="message-wrapper">
            <div className="title-wrapper">
                <div className="date-wrapper">
                    <span className="date">{moment(createdOn).format('DD/MM/YY - HH:mm')}</span>
                </div>
                <button
                    className="no-background-btn"
                    onClick={() => dispatch(dismissSystemMessage(id))}
                >
                    <i className="fas fa-times-circle close-icon" />
                </button>
            </div>

            <div>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default SystemMessagesListItem;
