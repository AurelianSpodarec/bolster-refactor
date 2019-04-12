import React from 'react';

import Checkbox from 'components/shared/generic/form/presentational/Checkbox';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';

const CompanyServicesList = ({ subscriptions, handleChange, children }) => (
    <div className="subscriptions-list size-lg-12">
        {subscriptions.map(subscription => (
            <div
                key={`subscription-${subscription.id}`}
                className="subscription-item size-lg-6"
            >
                <div className="field-name size-lg-6">
                    <StatusIcon />
                    <label
                        className=""
                        htmlFor={`subscription-id-${subscription.id}`}
                    >
                        {subscription.name}
                    </label>
                </div>
                <Checkbox
                    classes="small-text"
                    checked={subscription.isAutoRenew}
                    name={subscription.name}
                    value={subscription.serviceID}
                    id={`subscription-id-${subscription.id}`}
                    handleChange={handleChange}
                    text="Renew?"
                />
            </div>
        ))}
        {children}
    </div>
);

export default CompanyServicesList;
