import React from 'react';
import { useDispatch } from 'react-redux';
import useMessageCentreTable from './hooks/useMessageCentreTable';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import MessageCentreTabs from './MessageCentreTabs';
import MessagesList from './MessagesList';
import SearchBar from 'components/companyAdmin/layout/header/presentational/SearchBar';
import { MESSAGE_CENTRE_TABS } from 'constants/companyAdmin/enums';
import dismissSystemMessages from 'actions/companyAdmin/messageCentre/async/dismissSystemMessages';
import dismissOperativeAlerts from 'actions/companyAdmin/messageCentre/async/dismissOperativeAlerts';
import dismissCompanyAlerts from 'actions/companyAdmin/messageCentre/async/dismissCompanyAlerts';
import dismissDrawingExpiryMessages from 'actions/companyAdmin/messageCentre/async/dismissDrawingExpiryMessages';

const MessageCentreTable = () => {
    const dispatch = useDispatch();
    const { selectedTab, messages, isFetching, error, searchTerm, handleSearch } =
        useMessageCentreTable();

    const handleDismiss = () => {
        switch (selectedTab) {
            case MESSAGE_CENTRE_TABS.SYSTEM_MESSAGES:
                return dispatch(dismissSystemMessages());
            case MESSAGE_CENTRE_TABS.COMPANY_ALERTS:
                return dispatch(dismissCompanyAlerts());
            case MESSAGE_CENTRE_TABS.OPERATIVE_ALERTS:
                return dispatch(dismissOperativeAlerts());
            case MESSAGE_CENTRE_TABS.DRAWING_EXPIRY:
                return dispatch(dismissDrawingExpiryMessages());
        }
    };

    return (
        <BlockContainer>
            <MessageCentreTabs selectedTab={selectedTab} />
            <div className="size-lg-12">
                {!!messages.length && (
                    <div className="action-bar">
                        <div className="size-lg-7">
                            <SearchBar
                                omitIcon
                                handleChange={handleSearch}
                                searchTerm={searchTerm}
                            />
                        </div>
                        <div className="button-wrapper">
                            <button className="button rounded red" onClick={() => handleDismiss()}>
                                <i className="fas fa-trash-alt"></i>
                                Dismiss All
                            </button>
                        </div>
                    </div>
                )}
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
