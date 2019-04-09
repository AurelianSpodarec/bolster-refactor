import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const SubscriptionStatus = ({ subscriptions, active, endOn }) => (
    <div className="size-lg-12">
        <PageHeading
            title={`Subscription status: ${active ? 'Active' : 'Inactive'}`}
        >
            <i className={`fa ${active ? 'fa-check' : 'fa-times'}`} />
        </PageHeading>
        <p>
            {subscriptions.isAutoRenew
                ? `Your subscription is set to auto-renew on ${endOn} at a
            cost of ##£3000##`
                : `Your subscription is not set to auto-renew and will end on ${endOn}`}
        </p>
    </div>
);

export default SubscriptionStatus;
