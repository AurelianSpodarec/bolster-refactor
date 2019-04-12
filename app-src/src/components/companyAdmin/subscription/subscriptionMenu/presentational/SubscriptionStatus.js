import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';

const SubscriptionStatus = ({ subscriptions, active, endOn }) => (
    <div className="size-lg-12">
        <BlockHeading
            title={`Subscription status: ${active ? 'Active' : 'Inactive'}`}
        >
            <StatusIcon />
        </BlockHeading>
        <p className="size-lg-12">
            {subscriptions.isAutoRenew
                ? `Your subscription is set to auto-renew on ${endOn} at a
            cost of £${subscriptions.renewalPrice}`
                : `Your subscription is not set to auto-renew and will end on ${endOn}`}
        </p>
    </div>
);

export default SubscriptionStatus;
