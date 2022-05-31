import React from 'react';

import { isEmpty } from 'helpers/generic';

import useFetchPushNotifications from './hooks/useFetchPushNotifications';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';

const PushNotifications = () => {
    const { pushNotifications, isFetching, error } = useFetchPushNotifications();

    return (
        <>
            <FlexHeading title="Push Notifications" />
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
