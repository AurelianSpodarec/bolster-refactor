import React from 'react';
import { Link } from 'react-router-dom';

const ServiceListItem = ({ service }) => (
    <tr>
        <td>{service.name}</td>
        <td>{service.showOnCompanySite ? 'Yes' : 'No'}</td>
        <td>
            <Link to={`/admin/services/${service.id}/edit`} className="button">
                edit
            </Link>
        </td>
    </tr>
);

export default ServiceListItem;
