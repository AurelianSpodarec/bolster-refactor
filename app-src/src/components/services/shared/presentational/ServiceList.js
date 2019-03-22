import React from 'react';
import ServiceListItem from './ServiceListItem';

const ServiceList = ({ servicesArray, colCount }) =>
    servicesArray.map(service => (
        <ServiceListItem
            key={service.id}
            colCount={colCount}
            service={service}
        />
    ));

export default ServiceList;
