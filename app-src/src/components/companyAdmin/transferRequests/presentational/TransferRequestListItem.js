import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const TransferRequestListItem = ({
    request,
    companyID,
    handleAccept,
    handleDecline
}) => (
    <tr>
        {/* TODO: moment */}
        <td>{request.createdOn}</td>
        {/* TODO: site TYPE? */}
        <td>{request.siteName}</td>
        <td>{request.inviteFromCompanyName}</td>
        <td>{request.inviteToCompanyName}</td>
        <td>
            <BlockButtonWrapper>
                {companyID === request.inviteToCompanyID && (
                    <button
                        type="button"
                        className="button"
                        onClick={handleAccept}
                    >
                        <i className="fa fa-check" />
                    </button>
                )}
                <button
                    type="button"
                    className="button"
                    onClick={handleDecline}
                >
                    <i className="fa fa-times" />
                </button>
                {/* X button */}
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default TransferRequestListItem;
