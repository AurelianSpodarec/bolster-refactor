import React from 'react';
import { connect } from 'react-redux';
import MessageItem from '../presentational/MessageItem';

const MessageItemContainer = ({ message }) => (
    <MessageItem message={message} />
);

const mapDispatchToProps = () => ({});

export default connect(mapDispatchToProps)(MessageItemContainer);
