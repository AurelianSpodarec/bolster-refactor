import React from 'react';
import SubscriptionStatusContainer from '../containers/SubscriptionStatusContainer';
import ActiveServicesContainer from '../../activeServices/containers/ActiveServicesContainer';
import PendingInvoicesContainer from 'components/companyAdmin/invoices/pendingInvoices/containers/PendingInvoicesContainer';
import SubscriptionAutoRenewalContainer from '../../autoRenewal/containers/SubscriptionAutoRenewalContainer';
import SubscriptionCreditsContainer from '../../credits/containers/SubscriptionCreditsContainer';
import CardManagement from '../../cardManagement/presentational/CardManagement';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const Subscription = () => (
    <>
        <PageHeading title="My Subscription" />

        <div className="size-lg-8">
            <SubscriptionStatusContainer />
            <ActiveServicesContainer />
            <PendingInvoicesContainer />
            <CardManagement />
        </div>
        <div className="size-lg-4">
            <SubscriptionAutoRenewalContainer />
            <SubscriptionCreditsContainer />
        </div>
    </>
);

export default Subscription;
