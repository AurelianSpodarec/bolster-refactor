import React, { Component } from 'react';
import { connect } from 'react-redux';

import SuperAdminInvoices from '../presentational/SuperAdminInvoices';
import fetchAllInvoices from 'actions/superAdmin/invoices/async/fetchAllInvoices';

class SuperAdminInvoicesContainer extends Component {
    render = () => {
        const { isFetching, error, invoices } = this.props;
        return (
            <SuperAdminInvoices
                isFetching={isFetching}
                error={error}
                invoices={invoices}
            />
        );
    };

    componentDidMount = () => this.props.fetchAllInvoices();
}

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { isFetching, error, invoices }
    }
}) => ({
    isFetching,
    error,
    invoices
});

const mapDispatchToProps = dispatch => ({
    fetchAllInvoices: () => dispatch(fetchAllInvoices())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SuperAdminInvoicesContainer);
