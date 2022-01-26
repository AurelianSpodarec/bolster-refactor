import React from 'react';
import moment from 'moment';

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
    subscriptions: { isAutoRenew, renewalPrice, renewalType, hasUnpaidServiceInvoice },
    active,
    endOn,
    latestStartOn,
    latestEndOn,
    noCards,
    shouldRestrictPayments,
    hadPendingProforma,
    isLatest,
    isFirst,
}) => {
    const topMessage = isFirst
        ? 'To complete the registration process, please select the services and drawing credits you require. If you are paying by card you will also need to add a card below. '
        : hasUnpaidServiceInvoice
        ? 'You have no subscription due to an unpaid service invoice, please pay the outstanding invoices to gain access to the site.'
        : 'You have no subscription, please add a service to subscribe and gain access to the site.';

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
                        <p className="size-lg-12">
                            Company subscription is set to auto-renew on{' '}
                            <strong>
                                <DateTimeContainer date={latestEndOn || endOn} />
                            </strong>{' '}
                            at a cost of <strong>£{formatNumber(renewalPrice)}</strong>
                        </p>

                        {hadPendingProforma && renewalType === INVOICE && (
                            <p className="info-message warning" style={{ marginTop: '15px' }}>
                                There is an outstanding auto-renew invoice. If no action is taken,
                                your subscription will expire on{' '}
                                <strong>
                                    <DateTimeContainer date={endOn} />
                                </strong>
                                .
                            </p>
                        )}
                        {hadPendingProforma && renewalType === CARD && (
                            <p className="info-message warning" style={{ marginTop: '15px' }}>
                                There is an outstanding auto-renew invoice. Since you{"'"}re set to
                                auto-renewal & pay by card, we will automatically attempt to take
                                payment before your renewal date. Your renewal date is{' '}
                                <strong>
                                    <DateTimeContainer date={endOn} />
                                </strong>
                            </p>
                        )}

                        {hadPendingProforma &&
                            !isLatest &&
                            moment(new Date()).isBefore(latestStartOn) && (
                                <p className="info-message warning" style={{ marginTop: '15px' }}>
                                    Your auto renewal subscription will begin on{' '}
                                    {moment(endOn).format('DD/MM/YYYY')}, you will be able to manage
                                    your subscription preferences after this date.
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
                <p className="size-lg-12">{topMessage}</p>
            )}
        </div>
    );
};

export default SubscriptionStatus;
