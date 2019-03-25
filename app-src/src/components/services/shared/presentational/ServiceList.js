import React from 'react';
import ServiceListItemContainer from '../containers/ServiceListItemContainer';

const ServiceList = ({ services, colCount }) =>
    services.map(service => (
        <ServiceListItemContainer
            key={service.id}
            colCount={colCount}
            service={service}
        />
    ));

export default ServiceList;
