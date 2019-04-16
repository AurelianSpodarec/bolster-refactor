import React from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import MessageTable from '../presentational/MessageTable';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SystemMessageTableContainer = ({ messages, isFetching, error }) => (
    <BlockContainer error={error}>
        <BlockHeading title="System Messages" />
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
