import React from 'react';
import moment from 'moment';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import { MESSAGE_CENTRE_NAMES } from 'constants/companyAdmin/enums';

const MessagesList = ({ messages, isFetching, error, selectedTab }) => {
    return (
        <BlockContainer
            containerClass="no-padding"
            contentClass="no-padding"
            isFetching={isFetching}
            isEmpty={isEmpty(messages)}
            error={error}
            noDataMessage={`No ${MESSAGE_CENTRE_NAMES[selectedTab]} To View`}
        >
            <div className="messages-container">
                {messages.map(
                    ({ id, message, createdOn, createdByUserFirstName, createdByUserLastName }) => (
                        <div key={id} className="message-wrapper">
                            <div className="title-wrapper">
                                <h3 className="title">{`${createdByUserFirstName} ${createdByUserLastName}`}</h3>

                                <div className="date-wrapper">
                                    <span className="date">
                                        {moment(createdOn).format('DD/MM/YY - hh:mm')}
                                    </span>
                                    <i className="fas fa-times-circle close-icon" />
                                </div>
                            </div>

                            <div>
                                <p>{message}</p>
                            </div>
                        </div>
                    ),
                )}
            </div>
        </BlockContainer>
    );
};

export default MessagesList;
