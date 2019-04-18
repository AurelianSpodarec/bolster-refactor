import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import InvoicesTable from '../presentational/InvoicesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const InvoicesTableContainer = ({ invoices, isFetching, error }) => {
    const headers = ['Created', 'Total', 'Payment Type', 'Paid'];
    return (
        <BlockContainer heading="Invoices">
            <InvoicesTable
                headers={headers}
                invoices={invoices}
                isFetching={isFetching}
                error={error}
            />
        </BlockContainer>
    );
};

const mapStateToProps = (
    {
        superAdmin: {
            invoicesReducer: { invoices, isFetching, error }
        }
    },
    { match: { params } }
) => ({
    invoices: Object.values(invoices).filter(
        invoice => +invoice.companyID === +params.id
    ),
    isFetching,
    error
});
export default withRouter(connect(mapStateToProps)(InvoicesTableContainer));
