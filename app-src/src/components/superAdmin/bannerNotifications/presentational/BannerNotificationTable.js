import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import BannerNotificationList from './BannerNotificationsList';

const BannerNotificationTable = ({
    showModal,
    headers,
    isFetching,
    error,
    bannerNotifications,
    showEditModal,
    showDeleteModal,
}) => {
    return (
        <BlockContainer>
            <BlockHeading title="Notifcations">
                <button className="button green" onClick={showModal}>
                    <i className="fa fa-plus" /> Add New Banner Notifcation
                </button>
            </BlockHeading>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!bannerNotifications.length}
                noDataMessage="No Banner Notifications to Display"
            >
                <BannerNotificationList
                    bannerNotifications={bannerNotifications}
                    showEditModal={showEditModal}
                    showDeletModal={showDeleteModal}
                />
            </Table>
        </BlockContainer>
    );
};

export default BannerNotificationTable;
