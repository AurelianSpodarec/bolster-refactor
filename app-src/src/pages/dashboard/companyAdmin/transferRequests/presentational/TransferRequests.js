import React from 'react';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import TransferRequestsTableContainer from '../containers/TransferRequestsTableContainer';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import PendingInvitesTableContainer from '../containers/PendingInvitesTableContainer';
import MySubscriptionContainer from 'pages/dashboard/companyAdmin/messages/allMessages/containers/MySubscriptionContainer';
import TwitterFeed from 'components_DEPRECATED/shared/twitterFeed/presentational/TwitterFeed';

const TransferRequests = () => (
    <>
        <PageHeading title="Pending Requests" />
        <div className="size-lg-8 size-md-12">
            <BlockContainer>
                <BlockHeading title="Pending Invites" />
                <PendingInvitesTableContainer />
            </BlockContainer>
            <BlockContainer>
                <BlockHeading title="Owner Requests" />
                <TransferRequestsTableContainer />
            </BlockContainer>
        </div>
        <div className="size-lg-4 size-md-12">
            <MySubscriptionContainer />
            <BlockContainer>
                <TwitterFeed />
            </BlockContainer>
        </div>
    </>
);

export default TransferRequests;
