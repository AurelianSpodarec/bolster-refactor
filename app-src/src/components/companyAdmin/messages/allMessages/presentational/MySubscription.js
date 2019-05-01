import React from 'react';
import { withRouter } from 'react-router-dom';
import MySubscribedServicesList from './MySubscribedServicesList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import { formatNumber } from 'helpers/generic';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

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
                    £{formatNumber(subscriptions.renewalPrice)}
                </span>
            </p>
        ) : (
            <p className="generic-text size-lg-12">
                Your subscription is not set to auto-renew and will end on{' '}
                <DateTimeContainer date={endOn} datetime={DATE_TIME_IDS.DATE} />
            </p>
        )}
        <BlockButtonWrapper>
            <ButtonContainer className="pull-right" to="/company/subscription">
                Manage My Subscription
            </ButtonContainer>
        </BlockButtonWrapper>
    </div>
);

export default withRouter(MySubscription);
