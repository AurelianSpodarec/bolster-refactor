import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { formatNumber } from 'helpers/generic';
import { SUBSCRIPTION_RENEWAL_IDS } from 'constants/companyAdmin/enums';
const { CARD, INVOICE } = SUBSCRIPTION_RENEWAL_IDS;

function renderIcon(isActive, hadPendingProforma) {
    if (hadPendingProforma)
        return <StatusIcon classes="warning" iconClass="fa fa-exclamation-triangle far" />;
    if (isActive) return <StatusIcon classes="check" iconClass="fa fa-check" />;
    return <StatusIcon classes="none" iconClass="fa fa-times" />;
}

const SubscriptionStatus = ({
    subscriptions: { isAutoRenew, renewalPrice, renewalType },
    active,
    endOn,
    noCards,
    shouldRestrictPayments,
    hadPendingProforma,
}) => {
    if (shouldRestrictPayments)
        return (
            <div className="size-lg-12">
                <BlockHeading title={`Account Status: ${active ? 'Active' : 'Inactive'}`}>
                    {renderIcon(active, hadPendingProforma)}
                </BlockHeading>
                <p className="info-message error" style={{ marginTop: '15px' }}>
                    This account has been restricted from payments, please contact your company
                    admin for further information.
                </p>
            </div>
        );

    return (
        <div className="size-lg-12">
            <BlockHeading title={`Account Status: ${active ? 'Active' : 'Inactive'}`}>
                {renderIcon(active, hadPendingProforma)}
            </BlockHeading>
            {active ? (
                isAutoRenew ? (
                    <>
                        {hadPendingProforma && renewalType === INVOICE ? (
                            <p className="info-message warning" style={{ marginTop: '15px' }}>
                                You have an outstanding auto-renew invoice. If no action is taken,
                                your subscription will expire on{' '}
                                <strong>
                                    <DateTimeContainer date={endOn} />
                                </strong>
                                .
                            </p>
                        ) : (
                            <p className="size-lg-12">
                                Company subscription is set to auto-renew on{' '}
                                <strong>
                                    <DateTimeContainer date={endOn} />
                                </strong>{' '}
                                at a cost of <strong>£{formatNumber(renewalPrice)}</strong>
                            </p>
                        )}
                        {noCards && renewalType === CARD && (
                            <p className="info-message error" style={{ marginTop: '15px' }}>
                                Your auto-renewal is set to use a card payment, however you do not
                                have any cards set up. Please set up a card or switch to invoice.
                            </p>
                        )}
                        {renewalType !== CARD && renewalType !== INVOICE && (
                            <p className="info-message error" style={{ marginTop: '15px' }}>
                                You have auto-renewal turned on, however have not selected a payment
                                method. Please select a payment method.
                            </p>
                        )}
                    </>
                ) : (
                    <p className="size-lg-12">
                        Company subscription is not set to auto-renew and will end on{' '}
                        <strong>
                            <DateTimeContainer date={endOn} />
                        </strong>
                    </p>
                )
            ) : (
                <p className="size-lg-12">
                    You have no subscription, please add a service to subscribe and gain access to
                    the site.
                </p>
            )}
        </div>
    );
};

export default SubscriptionStatus;
