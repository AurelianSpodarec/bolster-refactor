import React from 'react';
import { withRouter } from 'react-router-dom';

// import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

import { PAYMENT_TYPES, DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { formatCurrency } from 'helpers/generic';
// import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const SuperAdminListItem = ({
    invoice: { createdOn, isPaid, total, id, paymentType }
}) => (
    <tr>
        <td>
            <DateTimeContainer date={createdOn} datetime={DATE_TIME_IDS.DATE} />
        </td>
        <td>{id}</td>
        <td>{`£${formatCurrency(total)}`}</td>
        <td>{PAYMENT_TYPES[paymentType]}</td>
        <td>{isPaid ? 'Paid' : 'Awaiting Payment'}</td>
        <td>
            {/* <BlockButtonWrapper>
                <ButtonContainer to={`/admin/invoices/${id}`}>
                    View
                </ButtonContainer>
            </BlockButtonWrapper> */}
        </td>
    </tr>
);

export default withRouter(SuperAdminListItem);
