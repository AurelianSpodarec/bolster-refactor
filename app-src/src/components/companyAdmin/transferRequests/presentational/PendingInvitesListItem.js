import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const PendingInvitesListItem = ({
    invite,
    isIncoming,
    handleAccept,
    handleDecline,
    name
}) => (
    <tr>
        <td>
            <DateTimeContainer
                date={invite.createdOn}
                datetime={DATE_TIME_IDS.DATE}
            />
        </td>
        <td>{name}</td>
        <td>{invite.ownerCompanyName}</td>
        <td>{invite.companyName}</td>
        <td>
            <BlockButtonWrapper>
                {isIncoming && (
                    <button
                        type="button"
                        className="button green icon-only"
                        onClick={handleAccept}
                    >
                        <i className="far fa-check" />
                    </button>
                )}
                <button
                    type="button"
                    className="button red icon-only"
                    onClick={handleDecline}
                >
                    <i className="far fa-ban" />
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default PendingInvitesListItem;
