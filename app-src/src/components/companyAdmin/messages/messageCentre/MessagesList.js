import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import { MESSAGE_CENTRE_NAMES, MESSAGE_CENTRE_TABS } from 'constants/companyAdmin/enums';

import SystemMessagesListItem from './listItems/SystemMessagesListItem';
import OperativeAlertsListItem from './listItems/OperativeAlertsListItem';
import DrawingExpiryListItem from './listItems/DrawingExpiryListItem';
import CompanyAlertsListItem from './listItems/CompanyAlertsListItem';

const MessagesList = ({ messages, isFetching, error, selectedTab }) => {
    const RenderItem = ({ message }) => {
        switch (selectedTab) {
            case MESSAGE_CENTRE_TABS.SYSTEM_MESSAGES:
                return <SystemMessagesListItem message={message} />;
            case MESSAGE_CENTRE_TABS.COMPANY_ALERTS:
                return <CompanyAlertsListItem message={message} />;
            case MESSAGE_CENTRE_TABS.OPERATIVE_ALERTS:
                return <OperativeAlertsListItem message={message} />;
            case MESSAGE_CENTRE_TABS.DRAWING_EXPIRY:
                return <DrawingExpiryListItem message={message} />;
        }
    };
    return (
        <BlockContainer
            containerClass="no-padding"
            contentClass="no-padding"
            isFetching={isFetching}
            isEmpty={isEmpty(messages)}
            error={error}
            noDataMessage={`No ${MESSAGE_CENTRE_NAMES[selectedTab]} To View`}
        >
            <div className="messages-container">
                {messages.map((message, i) => (
                    <RenderItem key={i} message={message} />
                ))}
            </div>
        </BlockContainer>
    );
};

export default MessagesList;
