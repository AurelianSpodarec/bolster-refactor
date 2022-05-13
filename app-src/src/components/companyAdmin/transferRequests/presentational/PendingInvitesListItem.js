import React from 'react';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import { ReactComponent as TrashIcon } from '../../../../_content/images/icons/trash.svg';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const PendingInvitesListItem = ({
    invite,
    isIncoming,
    handleAccept,
    handleDecline,
    name,
    onMobile,
    headers,
    serviceName,
}) => (
    <tr>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
            <DateTimeContainer date={invite.createdOn} datetime={DATE_TIME_IDS.DATE} />
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
            {name}
        </td>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
            {serviceName}
        </td>

        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
            {invite.ownerCompanyName}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
            {invite.companyName}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
            <BlockButtonWrapper>
                <ButtonWrapper alignment="right">
                    <ActionButton
                        type="button"
                        onClick={handleDecline}
                        source="secondary"
                        ambient="positive"
                        iconOnly
                        svgIconComponent={TrashIcon}
                        iconWeight="light"
                        size="small"
                    />

                    {isIncoming && (
                        <ActionButton
                            type="button"
                            onClick={handleAccept}
                            iconOnly
                            icon="check"
                            size="small"
                        />
                    )}
                </ButtonWrapper>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default PendingInvitesListItem;
