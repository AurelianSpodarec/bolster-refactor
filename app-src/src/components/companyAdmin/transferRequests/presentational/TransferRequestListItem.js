import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const TransferRequestListItem = ({
    request,
    companyID,
    handleAccept,
    handleDecline
}) => (
    <tr>
        <td>
            <DateTimeContainer
                date={request.createdOn}
                datetime={DATE_TIME_IDS.DATE}
            />
        </td>
        <td>{request.siteName}</td>
        <td>{request.inviteFromCompanyName}</td>
        <td>{request.inviteToCompanyName}</td>
        <td>
            <BlockButtonWrapper>
                <button
                    type="button"
                    className="button"
                    onClick={handleDecline}
                >
                    <i className="far fa-ban" />
                </button>
                {companyID === request.inviteToCompanyID && (
                    <button
                        type="button"
                        className="button"
                        onClick={handleAccept}
                    >
                        <i className="far fa-check" />
                    </button>
                )}
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default TransferRequestListItem;
