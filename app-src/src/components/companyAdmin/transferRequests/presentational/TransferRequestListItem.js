import React from 'react';
import moment from 'moment';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const TransferRequestListItem = ({
    request,
    companyID,
    handleAccept,
    handleDecline
}) => (
    <tr>
        <td>{moment(request.createdOn).format('DD/MM/YYYY')}</td>
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
                        <i className="far fa-check" />
                    </button>
                )}
                <button
                    type="button"
                    className="button"
                    onClick={handleDecline}
                >
                    <i className="far fa-ban" />
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default TransferRequestListItem;
