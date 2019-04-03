import React from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import MessageTable from '../presentational/MessageTable';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';

const SystemMessageTableContainer = ({ messages, isFetching, error }) => (
    <BlockContainer heading="System Messages" error={error}>
        <MessageTable messages={messages} isFetching={isFetching} />
    </BlockContainer>
);

const mapStateToProps = ({
    companyAdmin: {
        messagesReducer: { messages, isFetching, error }
    }
}) => ({
    messages: Object.values(messages).filter(
        ({ isRead, type }) => !isRead && type === MESSAGE_TYPES.SYSTEM
    ),
    isFetching,
    error
});
export default connect(mapStateToProps)(SystemMessageTableContainer);
