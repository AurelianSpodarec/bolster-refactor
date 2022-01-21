import React from 'react';
import { useDispatch } from 'react-redux';

import dismissSystemMessage from 'actions/companyAdmin/messageCentre/async/dismissSystemMessage';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const SystemMessagesListItem = ({ message: { id, createdOn, message } }) => {
    const dispatch = useDispatch();

    return (
        <div key={id} className="message-wrapper">
            <div className="title-wrapper">
                <div className="date-wrapper">
                    <span className="date">
                        <DateTimeContainer date={createdOn} datetime={DATE_TIME_IDS.DATE} />
                    </span>
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
