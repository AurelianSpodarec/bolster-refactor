import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import SubscriptionStatusContainer from '../containers/SubscriptionStatusContainer';
import ActiveServicesContainer from '../containers/ActiveServicesContainer';
import PendingInvoicesContainer from '../containers/PendingInvoicesContainer';
import SubscriptionAutoRenewalContainer from '../containers/SubscriptionAutoRenewalContainer';
import SubscriptionCreditsContainer from '../containers/SubscriptionCreditsContainer';

const Subscription = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: '##subscription##' }]} />
        <div className="size-lg-8">
            <SubscriptionStatusContainer />
            <ActiveServicesContainer />
        </div>
        <div className="flex-item size-lg-4">
            <SubscriptionAutoRenewalContainer />
        </div>
        <div className="flex-item size-lg-8">
            <PendingInvoicesContainer />
        </div>
        <div className="flex-item size-lg-4">
            <SubscriptionCreditsContainer />
        </div>
    </>
);

export default Subscription;
