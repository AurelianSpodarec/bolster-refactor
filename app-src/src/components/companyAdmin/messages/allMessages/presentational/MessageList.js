import React from 'react';

import MessageItemContainer from '../containers/MessageItemContainer';

const MessageList = ({ messages }) =>
    messages
        .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
        .map(message => <MessageItemContainer key={message.id} message={message} />);

export default MessageList;
