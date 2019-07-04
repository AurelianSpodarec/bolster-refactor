import React from 'react';

import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const SubscribedServicesItem = ({
    key,
    subscription,
    handleChange,
    isAutoRenew
}) => (
    <div
        key={`subscription-${key}`}
        className="subscription-item size-lg-6 size-md-12"
    >
        <div className="field-name size-lg-6 size-md-8">
            <StatusIcon />
            <label htmlFor={`subscription-id-${subscription.id}`}>
                {subscription.name}
            </label>
        </div>
        {isAutoRenew && (
            <CheckboxContainer
                classes="small-text"
                checked={subscription.isAutoRenew}
                name={subscription.name}
                value={subscription.serviceID}
                id={`subscription-id-${subscription.id}`}
                handleChange={handleChange}
                text="Renew?"
            />
        )}
    </div>
);

export default SubscribedServicesItem;
