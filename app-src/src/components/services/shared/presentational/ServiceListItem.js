import React from 'react';

const ServiceListItem = ({ service, handleShowModal }) => (
    <>
        <tr>
            <td>{service.name}</td>
            <td>
                <button
                    onClick={() => handleShowModal(service)}
                    className="button"
                >
                    edit
                </button>
            </td>
        </tr>
    </>
);

export default ServiceListItem;
