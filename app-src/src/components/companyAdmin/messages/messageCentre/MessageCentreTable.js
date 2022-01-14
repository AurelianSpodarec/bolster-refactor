import React from 'react';
import { useDispatch } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import MessageCentreTabs from './MessageCentreTabs';
import useMessageCentreTable from './hooks/useMessageCentreTable';
import MessagesList from './MessagesList';
import SearchBar from 'components/companyAdmin/layout/header/presentational/SearchBar';
import { MESSAGE_CENTRE_TABS } from 'constants/companyAdmin/enums';
import dismissSystemMessages from 'actions/companyAdmin/messageCentre/async/dismissSystemMessages';
import dismissCompanyAlert from 'actions/companyAdmin/messageCentre/async/dismissCompanyAlert';

const MessageCentreTable = () => {
    const dispatch = useDispatch();
    const { selectedTab, setSelectedTab, messages, isFetching, error } = useMessageCentreTable();

    const handelDismiss = () => {
        if (selectedTab === MESSAGE_CENTRE_TABS.SYSTEM_MESSAGES) {
            console.log('dismiss messages');
            // dispatch(dismissSystemMessages);
        } else if (selectedTab === MESSAGE_CENTRE_TABS.COMPANY_ALERTS) {
            console.log('dismiss company alert');
            // dispatch(dismissCompanyAlert);
        } else if (selectedTab === MESSAGE_CENTRE_TABS.OPERATIVE_ALERTS) {
            console.log('dismiss operative alert');
        } else {
            console.log('dismiss drawing expiry');
        }
    };

    return (
        <BlockContainer>
            <MessageCentreTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className="size-lg-12">
                <div className="action-bar">
                    <div className="size-lg-7">
                        <SearchBar omitIcon />
                    </div>
                    <div className="button-wrapper">
                        <button className="button rounded red" onClick={() => handelDismiss()}>
                            <i className="fas fa-trash-alt"></i>
                            Dismiss All
                        </button>
                    </div>
                </div>
                <MessagesList
                    messages={messages}
                    isFetching={isFetching}
                    error={error}
                    selectedTab={selectedTab}
                />
            </div>
        </BlockContainer>
    );
};

export default MessageCentreTable;
