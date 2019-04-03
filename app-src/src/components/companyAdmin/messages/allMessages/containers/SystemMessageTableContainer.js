import React from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import MessageTable from '../presentational/MessageTable';

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
    messages: Object.values(messages),
    isFetching,
    error
});
export default connect(mapStateToProps)(SystemMessageTableContainer);
