import React from "react";
import { withRouter } from "react-router-dom";

import { PAYMENT_TYPES, DATE_TIME_IDS } from "constants/companyAdmin/enums";
import { formatCurrency } from "helpers/generic";
import DateTimeContainer from "components/shared/dateTime/containers/DateTimeContainer";
import BlockButtonWrapper from "components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper";
import LinkWithPropsContainer from "components/shared/generic/button/containers/LinkWithPropsContainer.js";

const SuperAdminListItem = ({
    invoice: { createdOn, isPaid, subTotal, id, paymentType, companyID },
    companies,
}) => (
    <tr>
        <td>
            <DateTimeContainer date={createdOn} datetime={DATE_TIME_IDS.DATE} />
        </td>
        <td>{companies[companyID].name}</td>
        <td>{id}</td>
        <td>{`£${formatCurrency(subTotal)}`}</td>
        <td>{PAYMENT_TYPES[paymentType]}</td>
        <td>{isPaid ? "Paid" : "Awaiting Payment"}</td>
        <td>
            <BlockButtonWrapper>
                <LinkWithPropsContainer
                    to={{
                        pathname: `/admin/invoices/${companyID}/${id}`,
                        state: { fromCompany: false },
                    }}
                >
                    View
                </LinkWithPropsContainer>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default withRouter(SuperAdminListItem);
