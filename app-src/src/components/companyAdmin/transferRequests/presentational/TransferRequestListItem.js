import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const TransferRequestListItem = ({
    request,
    companyID,
    handleAccept,
    handleDecline,
    onMobile,
    headers
}) => (
    <tr>
        <td>
            {onMobile && (
                <span className="mobile-table-heading">{headers[0]}</span>
            )}
            <DateTimeContainer
                date={request.createdOn}
                datetime={DATE_TIME_IDS.DATE}
            />
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[1]}</span>
            )}
            {request.siteName}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[2]}</span>
            )}
            {request.inviteFromCompanyName}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[3]}</span>
            )}
            {request.inviteToCompanyName}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[4]}</span>
            )}
            <BlockButtonWrapper>
                <button
                    type="button"
                    className="button red icon-only"
                    onClick={handleDecline}
                >
                    <i className="far fa-ban" />
                </button>
                {companyID === request.inviteToCompanyID && (
                    <button
                        type="button"
                        className="button green icon-only"
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
