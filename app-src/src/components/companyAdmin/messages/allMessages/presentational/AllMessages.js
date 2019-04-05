import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import SystemMessageTableContainer from '../containers/SystemMessageTableContainer';
import MySubscriptionContainer from '../containers/MySubscriptionContainer';

const AllMessages = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'All messages' }]} />
        <div className="size-lg-8">
            <SystemMessageTableContainer />
        </div>
        <div className="size-lg-4">
            <MySubscriptionContainer />
        </div>
    </>
);

export default AllMessages;
