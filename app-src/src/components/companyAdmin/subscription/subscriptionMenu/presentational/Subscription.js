import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import SubscriptionStatusContainer from '../containers/SubscriptionStatusContainer';
import ActiveServicesContainer from '../../activeServices/containers/ActiveServicesContainer';
import PendingInvoicesContainer from 'components/companyAdmin/invoices/pendingInvoices/containers/PendingInvoicesContainer';
import SubscriptionAutoRenewalContainer from '../../autoRenewal/containers/SubscriptionAutoRenewalContainer';
import SubscriptionCreditsContainer from '../../credits/containers/SubscriptionCreditsContainer';
import CardManagement from '../../cardManagement/presentational/CardManagement';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const Subscription = () => (
    <>
        <PageHeading title="My Subscription">
            <Breadcrumb breadcrumbs={[{ text: 'My Subscription' }]} />
        </PageHeading>

        <div className="size-lg-8">
            <SubscriptionStatusContainer />
            <ActiveServicesContainer />
        </div>
        <div className="size-lg-4">
            <SubscriptionAutoRenewalContainer />
            <SubscriptionCreditsContainer />
        </div>

        <div className="size-lg-8">
            <PendingInvoicesContainer />
            <CardManagement />
        </div>
    </>
);

export default Subscription;
