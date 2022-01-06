import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import MessageCentreTabs from './MessageCentreTabs';
import useMessageCentreTable from './hooks/useMessageCentreTable';
import MessagesList from './MessagesList';
import SearchBar from 'components/companyAdmin/layout/header/presentational/SearchBar';

const MessageCentreTable = () => {
    const { selectedTab, setSelectedTab, messages, showCreateNewButton } = useMessageCentreTable();

    return (
        <BlockContainer>
            <MessageCentreTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className="size-lg-12">
                <div className="action-bar">
                    <div className="size-lg-7">
                        <SearchBar omitIcon />
                    </div>
                    <div className="button-wrapper">
                        {showCreateNewButton && (
                            <button className="button rounded green">
                                <i className="fas fa-envelope"></i>
                                Create New
                            </button>
                        )}
                        <button className="button rounded red">
                            <i className="fas fa-trash-alt"></i>
                            Dismiss All
                        </button>
                    </div>
                </div>
                <MessagesList messages={messages} />
            </div>
        </BlockContainer>
    );
};

export default MessageCentreTable;
