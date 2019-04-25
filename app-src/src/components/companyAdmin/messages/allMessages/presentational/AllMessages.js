import React from 'react';

import SystemMessageTableContainer from '../containers/SystemMessageTableContainer';
import MySubscriptionContainer from '../containers/MySubscriptionContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllMessages = () => (
    <>
        <PageHeading title="All messages" withBackButton />
        <div className="size-lg-8">
            <SystemMessageTableContainer />
        </div>
        <div className="size-lg-4">
            <MySubscriptionContainer />
        </div>
    </>
);

export default AllMessages;
