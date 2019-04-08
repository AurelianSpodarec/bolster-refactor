import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const SubscriptionStatus = ({ subscriptions, active }) => {
    console.log(subscriptions);
    return (
        <div className="size-lg-12">
            <PageHeading
                title={`Subscription status: ${active ? 'active' : 'inactive'}`}
            >
                <i className={`fa ${active ? 'fa-check' : 'fa-times'}`} />
            </PageHeading>
            {subscriptions.isAutoRenew && (
                <p>
                    Your subscription is set to auto-renew on{' '}
                    {subscriptions.endOn} at a cost of ##£3000##
                </p>
            )}
        </div>
    );
};

export default SubscriptionStatus;
