import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { SUBSCRIPTION_RENEWAL_IDS } from 'constants/companyAdmin/enums';
import { formatNumber } from 'helpers/generic';

const SubscriptionStatus = ({ subscriptions, active, endOn, noCards }) => (
    <div className="size-lg-12">
        <BlockHeading
            title={`Account Status: ${active ? 'Active' : 'Inactive'}`}
        >
            <StatusIcon
                classes={active ? 'check' : 'none'}
                iconClass={active ? 'fa fa-check' : 'fa fa-times'}
            />
        </BlockHeading>
        {active ? (
            subscriptions.isAutoRenew ? (
                <>
                    <p className="size-lg-12">
                        Company subscription is set to auto-renew on{' '}
                        <strong>
                            <DateTimeContainer date={endOn} />
                        </strong>{' '}
                        at a cost of{' '}
                        <strong>
                            £{formatNumber(subscriptions.renewalPrice)}
                        </strong>
                    </p>
                    {noCards &&
                        subscriptions.renewalType ===
                            SUBSCRIPTION_RENEWAL_IDS.CARD && (
                            <p
                                className="info-message error"
                                style={{ marginTop: '15px' }}
                            >
                                Your auto-renewal is set to use a card payment,
                                however you do not have any cards set up. Please
                                set up a card or switch to invoice.
                            </p>
                        )}
                    {subscriptions.renewalType !==
                        SUBSCRIPTION_RENEWAL_IDS.CARD &&
                        subscriptions.renewalType !==
                            SUBSCRIPTION_RENEWAL_IDS.INVOICE && (
                            <p
                                className="info-message error"
                                style={{ marginTop: '15px' }}
                            >
                                You have auto-renewal turned on, however have
                                not selected a payment method. Please select a
                                payment method.
                            </p>
                        )}
                </>
            ) : (
                <p className="size-lg-12">
                    Company subscription is not set to auto-renew and will end
                    on{' '}
                    <strong>
                        <DateTimeContainer date={endOn} />
                    </strong>
                </p>
            )
        ) : (
            <p className="size-lg-12">
                You have no subscription, please add a service to subscribe and
                gain access to the site.
            </p>
        )}
    </div>
);

export default SubscriptionStatus;
