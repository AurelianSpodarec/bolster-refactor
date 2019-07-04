import React from 'react';

import SystemMessageTableContainer from '../containers/SystemMessageTableContainer';
import MySubscriptionContainer from '../containers/MySubscriptionContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import AllOperativeAlertsContainer from 'components/companyAdmin/operativeAlerts/allOperativeAlerts/containers/AllOperativeAlertsContainer';

const AllMessages = () => (
    <>
        <PageHeading title="All messages" withBackButton />
        <div className="size-lg-8 size-md-12">
            <SystemMessageTableContainer />
            <AllOperativeAlertsContainer />
        </div>
        <div className="size-lg-4 size-md-12">
            <MySubscriptionContainer />
        </div>
    </>
);

export default AllMessages;
