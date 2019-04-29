import React, { Component } from 'react';
import { connect } from 'react-redux';
import InvoicesTable from '../presentational/InvoicesTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';

class InvoicesTableContainer extends Component {
    render = () => {
        const { error, isFetching, invoices, showModal } = this.props;
        return (
            <InvoicesTable
                headers={[
                    'Date',
                    'Order ID',
                    'Total',
                    'Type',
                    'Status',
                    '',
                    'Ordered By',
                    'Action'
                ]}
                error={error}
                isFetching={isFetching}
                invoices={invoices}
                showModal={showModal}
            />
        );
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, fetchInvoices } = this.props;
        if (postSuccess && !prevProps.postSuccess) fetchInvoices();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        invoicesReducer: { error, isFetching, postSuccess }
    }
}) => ({
    error,
    isFetching,
    postSuccess
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    fetchInvoices: () => dispatch(fetchAllInvoices())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoicesTableContainer);
