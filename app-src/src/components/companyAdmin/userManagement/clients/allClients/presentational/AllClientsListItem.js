import React from 'react';
import { Link } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AllClientsListItem = ({ client, services, goToEdit, removeAccess }) => (
    <tr key={client.id}>
        <td>{`${client.userFirstName} ${client.userLastName}`}</td>
        <td>{client.companyName}</td>
        <td>
            <Link
                className="link grey"
                to={`/company/drawings/${client.drawingID}`}
            >{`${client.siteName} / ${client.buildingName} / ${
                client.floorName
            } / ${client.drawingName}`}</Link>
        </td>
        <td>{services.join(', ')}</td>
        <td>
            <BlockButtonWrapper>
                <button className="button yellow" onClick={() => goToEdit()}>
                    <i className="fal fa-pencil" /> Edit
                </button>
                <button className="button red" onClick={() => removeAccess()}>
                    <i className="fal fa-times" /> Remove access
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default AllClientsListItem;
