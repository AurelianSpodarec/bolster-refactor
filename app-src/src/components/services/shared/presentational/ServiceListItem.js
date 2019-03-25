import React from 'react';

const ServiceListItem = ({ service }) => (
    <>
        <tr>
            <td>{service.name}</td>
            <td>
                <button>edit</button>
            </td>
        </tr>
    </>
);

export default ServiceListItem;
