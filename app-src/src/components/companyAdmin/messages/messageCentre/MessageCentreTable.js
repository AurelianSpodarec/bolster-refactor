import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import MessageCentreTabs from './MessageCentreTabs';
import useMessageCentreTable from './hooks/useMessageCentreTable';

const MessageCentreTable = () => {
    const { selectedTab, setSelectedTab, messages } = useMessageCentreTable();
    return (
        <BlockContainer>
            <MessageCentreTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className="size-lg-12">
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
            </div>
        </BlockContainer>
    );
};

export default MessageCentreTable;
