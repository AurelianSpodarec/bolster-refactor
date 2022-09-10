import React from 'react';

import { isEmpty } from 'helpers/generic';

import useFetchPushNotifications from './hooks/useFetchPushNotifications';
import usePushNotificationActions from './hooks/usePushNotificationActions';

import Table from 'components_DEPRECATED/shared/generic/tables/presentational/Table';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import FlexHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/FlexHeading';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import PushNotificationListItem from './PushNotificationListItem';

const PushNotifications = () => {
    const { pushNotifications, isFetching, error, isBolsterPlusActivated } =
        useFetchPushNotifications();
    const { handleAddNotification, handleEditNotification, handleDeleteNotification } =
        usePushNotificationActions();

    return (
        <div className={`${!isBolsterPlusActivated ? 'blur' : ''}`}>
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
                    headers={['Title', 'Message', 'Frequency', 'Days', 'Date', 'Last sent on', '']}
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
        </div>
    );
};

export default PushNotifications;
