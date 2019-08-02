import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const PendingInvitesListItem = ({
    invite,
    isIncoming,
    handleAccept,
    handleDecline,
    name,
    onMobile,
    headers,
    serviceName
}) => (
    <tr>
        <td>
            {onMobile && (
                <span className="mobile-table-heading">{headers[0]}</span>
            )}
            <DateTimeContainer
                date={invite.createdOn}
                datetime={DATE_TIME_IDS.DATE}
            />
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[1]}</span>
            )}
            {name}
        </td>
        <td>
            {onMobile && (
                <span className="mobile-table-heading">{headers[2]}</span>
            )}
            {serviceName}
        </td>

        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[3]}</span>
            )}
            {invite.ownerCompanyName}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[4]}</span>
            )}
            {invite.companyName}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[5]}</span>
            )}
            <BlockButtonWrapper>
                <button
                    type="button"
                    className="button red icon-only"
                    onClick={handleDecline}
                >
                    <i className="far fa-ban" />
                </button>
                {isIncoming && (
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

export default PendingInvitesListItem;
