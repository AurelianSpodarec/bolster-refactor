import React from 'react';

import SubscriptionStatusContainer from '../containers/SubscriptionStatusContainer';
import ActiveServicesContainer from '../../activeServices/containers/ActiveServicesContainer';
import PendingInvoicesContainer from 'pages/dashboard/companyAdmin/invoices/pendingInvoices/containers/PendingInvoicesContainer';
import SubscriptionCreditsContainer from '../../credits/containers/SubscriptionCreditsContainer';
import CardManagement from '../../cardManagement/presentational/CardManagement';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BolsterPlusPod from '../../addOns/BolsterPlusPod';
import SubscriptionAutoRenewal from '../../autoRenewal/SubscriptionAutoRenewal';

const Subscription = ({ shouldRestrictPayments }) => (
    <>
        <PageHeading title="Account Overview" />

        <div className="size-lg-8 size-md-12">
            <SubscriptionStatusContainer shouldRestrictPayments={shouldRestrictPayments} />
            {!shouldRestrictPayments && (
                <>
                    <ActiveServicesContainer />
                    <BolsterPlusPod />
                    <CardManagement />
                </>
            )}
        </div>
        {!shouldRestrictPayments && (
            <>
                <div className="size-lg-4 size-md-12">
                    <SubscriptionAutoRenewal />
                    <SubscriptionCreditsContainer />
                </div>
                <div className="size-lg-8 size-md-12">
                    <PendingInvoicesContainer />
                </div>
            </>
        )}
    </>
);

export default Subscription;
