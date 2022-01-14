import React from 'react';

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
                {messages.map(message => (
                    <div key={message.id} className="message-wrapper">
                        <div className="title-wrapper">
                            <h3 className="title">{`${message.createdByUserFirstName} ${message.createdByUserLastName}`}</h3>

                            <div className="date-wrapper">
                                <span className="date">{message.createdOn}</span>
                                <i className="fas fa-times-circle close-icon" />
                            </div>
                        </div>

                        <div
                            dangerouslySetInnerHTML={{ __html: message.message }}
                            className="wysiwyg"
                        />
                    </div>
                ))}
            </div>
        </BlockContainer>
    );
};

export default MessagesList;
