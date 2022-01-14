import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';

const MessagesList = ({ messages, isFetching, error }) => {
    return (
        <BlockContainer
            containerClass="no-padding"
            contentClass="no-padding"
            isFetching={isFetching}
            isEmpty={isEmpty(messages)}
            error={error}
        >
            <div className="messages-container">
                {messages.map(message => (
                    <div key={message.id} className="message-wrapper">
                        <div className="title-wrapper">
                            <h3 className="title">{message.title}</h3>

                            <div className="date-wrapper">
                                <span className="date">{message.date}</span>
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
