import React from 'react';
import { useDispatch } from 'react-redux';
import useMessageCentreTable from './hooks/useMessageCentreTable';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import MessageCentreTabs from './MessageCentreTabs';
import MessagesList from './MessagesList';
import SearchBar from 'components/companyAdmin/layout/header/presentational/SearchBar';
import { MESSAGE_CENTRE_NAMES, MESSAGE_CENTRE_TABS } from 'constants/companyAdmin/enums';
import dismissSystemMessages from 'actions/companyAdmin/messageCentre/async/dismissSystemMessages';
import dismissOperativeAlerts from 'actions/companyAdmin/messageCentre/async/dismissOperativeAlerts';
import dismissCompanyAlerts from 'actions/companyAdmin/messageCentre/async/dismissCompanyAlerts';
import dismissDrawingExpiryMessages from 'actions/companyAdmin/messageCentre/async/dismissDrawingExpiryMessages';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_DELETE } from 'constants/shared/modalTypes';

const MessageCentreTable = () => {
    const dispatch = useDispatch();
    const {
        selectedTab,
        messages,
        isFetching,
        error,
        searchTerm,
        handleSearch,
        shouldShowSearchAndDelete,
        showCreateNewButton,
        handleDismiss,
        handleShowCreateNewModal,
    } = useMessageCentreTable();

    return (
        <BlockContainer>
            <MessageCentreTabs selectedTab={selectedTab} />
            <div className="size-lg-12">
                <div className="action-bar">
                    {shouldShowSearchAndDelete && (
                        <div className="size-lg-7">
                            <SearchBar
                                omitIcon
                                handleChange={handleSearch}
                                searchTerm={searchTerm}
                            />
                        </div>
                    )}
                    <div className="button-wrapper">
                        {showCreateNewButton && (
                            <button
                                className="button rounded green"
                                onClick={() => handleShowCreateNewModal()}
                            >
                                <i className="fas fa-envelope"></i>
                                Create New
                            </button>
                        )}
                        {shouldShowSearchAndDelete && (
                            <button
                                className="button rounded red"
                                onClick={() =>
                                    dispatch(
                                        showModal(CONFIRM_DELETE, {
                                            message: `Are you sure you would like to dismiss all the ${MESSAGE_CENTRE_NAMES[selectedTab]}?`,
                                            deleteButtonText: 'Confirm',
                                            handleDelete: handleDismiss,
                                            isPosting,
                                        }),
                                    )
                                }
                            >
                                <i className="fas fa-trash-alt"></i>
                                Dismiss All
                            </button>
                        )}
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
