import React from 'react';
import { connect } from 'react-redux';

import PendingInvoices from '../presentational/PendingInvoices';
import { sortArrayByField } from 'helpers/generic';

const PendingInvoicesContainer = ({ invoices }) => <PendingInvoices invoices={invoices} />;

const mapStateToProps = ({
    companyAdmin: {
        invoicesReducer: { invoices },
    },
}) => ({
    invoices: sortArrayByField(
        Object.values(invoices).filter(({ isPaid }) => !isPaid),
        'createdOn',
    ),
});

export default connect(mapStateToProps)(PendingInvoicesContainer);
