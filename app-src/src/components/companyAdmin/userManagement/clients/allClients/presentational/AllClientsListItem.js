import React from 'react';
import { Link } from 'react-router-dom';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AllClientsListItem = ({ client, services, removeAccess }) => (
    <tr key={client.id}>
        <td>{`${client.userFirstName} ${client.userLastName}`}</td>
        <td>{client.companyName}</td>
        <td />
        <td>{services.join(', ')}</td>
        <td>
            <BlockButtonWrapper>
                <Link
                    className="button yellow"
                    to={`/company/drawings/${client.drawingID}/edit-client/${
                        client.id
                    }`}
                >
                    <i className="fal fa-pencil" /> Edit
                </Link>
                <button className="button red" onClick={() => removeAccess()}>
                    <i className="fal fa-times" /> Remove access
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default AllClientsListItem;
