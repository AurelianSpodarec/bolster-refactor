import React from 'react';

import { isEmpty } from 'helpers/generic';

import useFetchPushNotifications from './hooks/useFetchPushNotifications';
import usePushNotificationActions from './hooks/usePushNotificationActions';

// Only thing changes from superAdmin
import useFetchCompanyUsers from '../hooks/useFetchCompanyUsers';
import useFetchSites from '../hooks/useFetchSites';
// End

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import PushNotificationListItem from './PushNotificationListItem';
import useIsAdminPlus from '../../../../hooks/useIsAdminPlus';
import TooltipContainer from '../../../../components/shared/generic/tooltip/containers/TooltipContainer';

const PushNotifications = () => {
    const { pushNotifications, isFetching, error, isBolsterPlusActivated } =
        useFetchPushNotifications();
    const { handleAddNotification, handleEditNotification, handleDeleteNotification } =
        usePushNotificationActions();
    const isAdminPlus = useIsAdminPlus();

    useFetchSites();
    useFetchCompanyUsers();

    return (
        <div className={`${!isBolsterPlusActivated ? 'blur' : ''}`}>
            <FlexHeading title="Push Notifications">
                <TooltipContainer
                    shouldOutput={!isAdminPlus}
                    text="Push Notifications are only available to Admin Plus users"
                    side="left"
                >
                    <ActionButton
                        text="Add new"
                        icon="plus"
                        size="medium"
                        onClick={handleAddNotification}
                        disabled={!isAdminPlus}
                    />
                </TooltipContainer>
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
                                isAdminPlus={isAdminPlus}
                            />
                        ))}
                </Table>
            </BlockContainer>
        </div>
    );
};

export default PushNotifications;
