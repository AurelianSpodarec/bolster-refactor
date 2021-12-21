import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import MessageCentreTabs from './MessageCentreTabs';
import useMessageCentreTable from './hooks/useMessageCentreTable';

const MessageCentreTable = () => {
    const { selectedTab, setSelectedTab } = useMessageCentreTable();
    return (
        <BlockContainer>
            <MessageCentreTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </BlockContainer>
    );
};

export default MessageCentreTable;
