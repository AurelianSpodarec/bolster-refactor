import React from 'react';
import { useDispatch } from 'react-redux';

import { isEmpty } from 'helpers/generic';
import { CREATE_ADMIN_PUSH_NOTIFICATION_MODAL } from 'constants/shared/modalTypes';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import useFetchPushNotifications from './hooks/useFetchPushNotifications';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const PushNotifications = () => {
    const dispatch = useDispatch();

    const { pushNotifications, isFetching, error } = useFetchPushNotifications();

    return (
        <>
            <FlexHeading title="Push Notifications">
                <ActionButton
                    text="Add new"
                    icon="plus"
                    size="medium"
                    onClick={() => dispatch(showModal(CREATE_ADMIN_PUSH_NOTIFICATION_MODAL))}
                />
            </FlexHeading>
            <BlockContainer>
                <Table
                    headers={['Name', '']}
                    noData={isEmpty(pushNotifications)}
                    noDataMessage="There are no push notifications to display."
                    isFetching={isFetching}
                    error={error}
                >
                    <tr>
                        <td>Notification placeholder...</td>
                        <td></td>
                    </tr>
                </Table>
            </BlockContainer>
        </>
    );
};

export default PushNotifications;
