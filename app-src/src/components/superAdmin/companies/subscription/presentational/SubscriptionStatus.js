import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { formatNumber } from 'helpers/generic';

const SubscriptionStatus = ({ subscription, active, endOn, services }) => (
    <div className="size-lg-12">
        <BlockHeading
            title={`Subscription status: ${active ? 'Active' : 'Inactive'}`}
        >
            <StatusIcon
                classes={active ? '' : 'none'}
                iconClass={active ? 'fa fa-check' : 'fa fa-times'}
            />
        </BlockHeading>
        {active ? (
            <>
                {subscription.isAutoRenew ? (
                    <p className="size-lg-12">
                        Company subscription is set to auto-renew on{' '}
                        <strong>
                            <DateTimeContainer date={endOn} />
                        </strong>{' '}
                        at a cost of{' '}
                        <strong>
                            £{formatNumber(subscription.renewalPrice)}
                        </strong>
                    </p>
                ) : (
                    <p className="size-lg-12">
                        Company subscription is not set to auto-renew and will
                        end on{' '}
                        <strong>
                            <DateTimeContainer date={endOn} />
                        </strong>
                    </p>
                )}
                {!!subscription.serviceIDs && !!subscription.serviceIDs.length && (
                    <div className="size-lg-12 subscription-item">
                        <BlockHeading title="Services:" />
                        {subscription.services.map(({ serviceID }) =>
                            services[serviceID] ? (
                                <div className="field-name size-lg-6">
                                    <label className="generic-text">
                                        {services[serviceID].name}
                                        <StatusIcon />
                                    </label>
                                </div>
                            ) : null
                        )}
                    </div>
                )}
            </>
        ) : (
            <p className="size-lg-12">
                You have no subscription, please add a service to subscribe.
            </p>
        )}
    </div>
);

export default SubscriptionStatus;
