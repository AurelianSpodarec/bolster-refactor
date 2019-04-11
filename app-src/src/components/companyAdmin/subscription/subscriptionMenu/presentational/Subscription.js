import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import SubscriptionStatusContainer from '../containers/SubscriptionStatusContainer';
import ActiveServicesContainer from '../../activeServices/containers/ActiveServicesContainer';
import PendingInvoicesContainer from 'components/companyAdmin/invoices/pendingInvoices/containers/PendingInvoicesContainer';
import SubscriptionAutoRenewalContainer from '../../autoRenewal/containers/SubscriptionAutoRenewalContainer';
import SubscriptionCreditsContainer from '../../credits/containers/SubscriptionCreditsContainer';
import CardManagement from '../../cardManagement/presentational/CardManagement';

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
            <CardManagement />
        </div>
        <div className="flex-item size-lg-4">
            <SubscriptionCreditsContainer />
        </div>
    </>
);

export default Subscription;
