import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import MessageList from '../presentational/MessageList';

const MessageTable = ({ isFetching, messages }) => (
    <Table
        headers={['Latest messages (last 30 days)', '']}
        withActions
        isFetching={isFetching}
        noData={!messages.length}
        noDataMessage='There are no system messages to display.'
    >
        <MessageList messages={messages} />
    </Table>
);

export default MessageTable;
