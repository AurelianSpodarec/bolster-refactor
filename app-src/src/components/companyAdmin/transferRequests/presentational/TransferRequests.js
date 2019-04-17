import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import TransferRequestsTableContainer from '../containers/TransferRequestsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import PendingInvitesTableContainer from '../containers/PendingInvitesTableContainer';
import MySubscriptionContainer from 'components/companyAdmin/messages/allMessages/containers/MySubscriptionContainer';
import TwitterFeed from 'components/shared/twitterFeed/presentational/TwitterFeed';

const TransferRequests = () => (
    <>
        <PageHeading title="Pending Requests" />
        <div className="size-lg-8">
            <BlockContainer>
                <BlockHeading title="Pending Invites" />
                <PendingInvitesTableContainer />
            </BlockContainer>
            <BlockContainer>
                <BlockHeading title="Owner Requests" />
                <TransferRequestsTableContainer />
            </BlockContainer>
        </div>
        <div className="size-lg-4">
            <MySubscriptionContainer />
            <BlockContainer>
                <TwitterFeed />
            </BlockContainer>
        </div>
    </>
);

export default TransferRequests;
