import React from 'react';
import SubscribedServicesItem from './SubscribedServicesItem';

const CompanyServicesList = ({ subscriptions, handleChange, isAutoRenew, children, canEdit }) => (
    <div className="subscriptions-list size-lg-12">
        {subscriptions.map(subscription => (
            <SubscribedServicesItem
                key={subscription.id}
                subscription={subscription}
                handleChange={handleChange}
                isAutoRenew={isAutoRenew}
                canEdit={canEdit}
            />
        ))}
        {children}
    </div>
);

export default CompanyServicesList;
