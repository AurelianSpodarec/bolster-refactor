import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import MySubscribedServicesList from './MySubscribedServicesList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const MySubscription = ({ services, daysleft, subscriptions, endOn }) => (
    <div className="size-lg-12">
        <BlockHeading title="My Subscription">
            <p className="generic-text small pull-right">
                {daysleft > 1
                    ? `(expires in ${daysleft} days)`
                    : daysleft
                    ? `(expires in ${daysleft} day)`
                    : 'expired'}
            </p>
        </BlockHeading>

        <MySubscribedServicesList services={services} />
        {subscriptions.isAutoRenew ? (
            <p className="generic-text size-lg-12">
                Your subscription is set to auto-renew on{' '}
                <span style={{ fontWeight: 'bold' }}>
                    <DateTimeContainer date={endOn} />
                </span>{' '}
                at a cost of{' '}
                <span style={{ fontWeight: 'bold' }}>
                    £{subscriptions.renewalPrice}
                </span>
            </p>
        ) : (
            <p className="generic-text size-lg-12">
                Your subscription is not set to auto-renew and will end on
                {endOn}
            </p>
        )}
        <BlockButtonWrapper>
            <Link className="button pull-right" to="/company/subscription">
                Manage My Subscription
            </Link>
        </BlockButtonWrapper>
    </div>
);

export default withRouter(MySubscription);
