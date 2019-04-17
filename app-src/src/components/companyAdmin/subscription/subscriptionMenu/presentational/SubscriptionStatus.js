import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const SubscriptionStatus = ({ subscriptions, active, endOn }) => (
    <div className="size-lg-12">
        <BlockHeading
            title={`Subscription status: ${active ? 'Active' : 'Inactive'}`}
        >
            <StatusIcon />
        </BlockHeading>
        {subscriptions.isAutoRenew ? (
            <p className="size-lg-12">
                Your subscription is set to auto-renew on{' '}
                <strong>{endOn}</strong> at a cost of{' '}
                <strong>£{subscriptions.renewalPrice}</strong>
            </p>
        ) : (
            <p className="size-lg-12">
                Your subscription is not set to auto-renew and will end on:
                <DateTimeContainer date={endOn} />
            </p>
        )}
    </div>
);

export default SubscriptionStatus;
