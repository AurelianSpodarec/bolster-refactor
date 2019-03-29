import React from 'react';
import ServiceCheckboxContainer from '../containers/ServiceCheckboxContainer';

const ServiceCheckboxList = ({ isFetching, error, services }) => {
    return (error ? <p>error</p> : isFetching ? 
    : services.map(service => (
        <ServiceCheckboxContainer key={service.id} service={service} />
    )));
};

export default ServiceCheckboxList;
