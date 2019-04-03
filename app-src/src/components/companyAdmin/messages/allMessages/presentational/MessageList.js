import React from 'react';

import MessageItemContainer from '../containers/MessageItemContainer';

const MessageList = ({ messages }) =>
    messages.map(message => (
        <MessageItemContainer key={message.id} message={message} />
    ));

export default MessageList;
