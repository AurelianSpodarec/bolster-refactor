import React from 'react';

const ServiceListItem = ({ service }) => (
    <>
        <tr>
            <td>{service.name}</td>
            <td>
                <button className="button">edit</button>
            </td>
        </tr>
    </>
);

export default ServiceListItem;
