import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import moment from 'moment';

const PendingInvitesListItem = ({
    invite,
    companyID,
    handleAccept,
    handleDecline
}) => {
    return (
        <tr>
            <td>{moment(invite.createdOn).format('DD/MM/YYYY')}</td>
            <td>##NAME##</td>
            <td>{invite.ownerCompanyName}</td>
            <td>{invite.companyName}</td>
            <td>
                <BlockButtonWrapper>
                    {/* invite is to logged in company */}
                    {companyID === invite.companyID && (
                        <button
                            type="button"
                            className="button green icon-only"
                            onClick={handleAccept}
                        >
                            <i className="fa fa-check" />
                        </button>
                    )}
                    <button
                        type="button"
                        className="button red icon-only"
                        onClick={handleDecline}
                    >
                        <i className="fa fa-times" />
                    </button>
                </BlockButtonWrapper>
            </td>
        </tr>
    );
};

export default PendingInvitesListItem;
