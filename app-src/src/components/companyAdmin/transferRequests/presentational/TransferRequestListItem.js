import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const TransferRequestListItem = ({ request }) => {
    return (
        <tr>
            {/* TODO: moment */}
            <td>{request.createdOn}</td>
            {/* TODO: site TYPE? */}
            <td>{request.siteName}</td>
            <td>{request.inviteFromCompanyName}</td>
            <td>{request.inviteToCompanyName}</td>
            <td>
                <BlockButtonWrapper />
            </td>
        </tr>
    );
};

export default TransferRequestListItem;
