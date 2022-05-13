import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { ReactComponent as TrashIcon } from '../../../../_content/images/icons/trash.svg';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const TransferRequestListItem = ({
    request,
    companyID,
    handleAccept,
    handleDecline,
    onMobile,
    headers,
}) => (
    <tr>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
            <DateTimeContainer date={request.createdOn} datetime={DATE_TIME_IDS.DATE} />
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
            {request.siteName}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
            {request.inviteFromCompanyName}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
            {request.inviteToCompanyName}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
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
                    {companyID === request.inviteToCompanyID && (
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

export default TransferRequestListItem;
