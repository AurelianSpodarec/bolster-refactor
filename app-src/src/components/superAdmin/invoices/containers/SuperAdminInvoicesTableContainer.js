import React from 'react';
import { connect } from 'react-redux';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import fetchAllInvoices from 'actions/superAdmin/invoices/async/fetchAllInvoices';
import SuperAdminInvoicesTable from '../presentational/SuperAdminInvoicesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SuperAdminInvoicesTableContainer = ({
    error,
    isFetching,
    invoices,
    companies
}) => (
    <BlockContainer>
        <BlockHeading title="All Invoices" />
        <SuperAdminInvoicesTable
            headers={[
                'Date',
                'Company Name',
                'Order ID',
                'Total',
                'Type',
                'Status',
                ''
            ]}
            error={error}
            isFetching={isFetching}
            invoices={invoices}
            companies={companies}
        />
    </BlockContainer>
);

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { error, isFetching, invoices },
        companiesReducer: {
            isFetching: isFetchingCompanies,
            error: companiesError,
            companies
        }
    }
}) => ({
    companies: companies || {},
    invoices: Object.values(invoices),
    error: error || companiesError,
    isFetching: isFetching || isFetchingCompanies
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    fetchAllInvoices: () => dispatch(fetchAllInvoices())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SuperAdminInvoicesTableContainer);
