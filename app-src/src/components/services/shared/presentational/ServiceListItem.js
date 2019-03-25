import React from 'react';

const ServiceListItem = ({ service, onClick }) => (
    <>
        <tr>
            <td>{service.name}</td>
            <td>
                <button onClick={() => onClick(service)} className="button">
                    edit
                </button>
            </td>
        </tr>
    </>
);

export default ServiceListItem;
