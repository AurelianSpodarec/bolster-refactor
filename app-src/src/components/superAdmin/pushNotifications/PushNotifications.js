import React from 'react';

import { isEmpty } from 'helpers/generic';

import useFetchPushNotifications from './hooks/useFetchPushNotifications';
import usePushNotificationActions from './hooks/usePushNotificationActions';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import PushNotificationListItem from './PushNotificationListItem';

const PushNotifications = () => {
    const { pushNotifications, isFetching, error } = useFetchPushNotifications();
    const { handleAddNotification, handleEditNotification, handleDeleteNotification } =
        usePushNotificationActions();

    return (
        <>
            <FlexHeading title="Push Notifications">
                <ActionButton
                    text="Add new"
                    icon="plus"
                    size="medium"
                    onClick={handleAddNotification}
                />
            </FlexHeading>
            <BlockContainer>
                <Table
                    headers={['Title', 'Message', 'Frequency', 'Date', 'Last sent on', '']}
                    noData={isEmpty(pushNotifications)}
                    noDataMessage="There are no push notifications to display."
                    isFetching={isFetching}
                    error={error}
                >
                    {Object.values(pushNotifications)
                        .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
                        .map(notification => (
                            <PushNotificationListItem
                                key={notification.id}
                                notification={notification}
                                handleEditNotification={handleEditNotification}
                                handleDeleteNotification={handleDeleteNotification}
                            />
                        ))}
                </Table>
            </BlockContainer>
        </>
    );
};

export default PushNotifications;
