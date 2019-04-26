import React from 'react';
import ServiceListItem from '../presentational/ServiceListItem';
import { ADMIN_EDIT_SERVICE } from 'constants/shared/modalTypes';

const ServiceListItemContainer = ({ service, colCount, showModal }) => (
    <ServiceListItem
        service={service}
        colCount={colCount}
        handleShowModal={() => showModal(ADMIN_EDIT_SERVICE, service)}
    />
);

export default ServiceListItemContainer;
