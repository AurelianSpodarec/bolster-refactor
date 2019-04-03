import React from 'react';
import { connect } from 'react-redux';
import MessageItem from '../presentational/MessageItem';
import dismissMessage from 'actions/companyAdmin/messages/async/dismissMessage';

const MessageItemContainer = ({ message, dismissMessage }) => (
    <MessageItem
        message={message}
        dismissMessage={() => dismissMessage(message.id)}
    />
);

const mapDispatchToProps = dispatch => ({
    dismissMessage: id => {
        dispatch(dismissMessage(id));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(MessageItemContainer);
