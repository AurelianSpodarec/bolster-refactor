import React from 'react';
import { Link } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AllClientsListItem = ({
    client,
    services,
    goToEdit,
    removeAccess,
    onMobile,
    headers
}) => (
    <tr key={client.id}>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[0]}</span>
            )}
            {`${client.userFirstName} ${client.userLastName}`}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[1]}</span>
            )}
            {client.companyName}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[2]}</span>
            )}
            <Link
                className="link grey"
                to={`/company/drawings/${client.drawingID}`}
            >{`${client.siteName} / ${client.buildingName} / ${
                client.floorName
            } / ${client.drawingName}`}</Link>
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[3]}</span>
            )}
            {services.join(', ')}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[4]}</span>
            )}
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
