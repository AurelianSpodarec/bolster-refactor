import React from 'react';

import MySubscribedServiceListItem from './MySubscribedServiceListItem';

const MySubscribedServicesList = ({ services }) => (
    <div className="subscriptions-list alt ignore-padding size-lg-12">
        {services.map(service => (
            <MySubscribedServiceListItem
                key={service.value}
                serviceName={service.text}
            />
        ))}
        {services.length % 2 != 0 && (
            <div className="subscription-item size-lg-6" />
        )}
    </div>
);

export default MySubscribedServicesList;
