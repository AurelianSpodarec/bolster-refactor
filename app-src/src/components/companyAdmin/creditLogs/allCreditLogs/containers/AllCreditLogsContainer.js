import React from 'react';
import { connect } from 'react-redux';

import AllCreditLogs from '../presentational/AllCreditLogs';
import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';
import { componentDidMount } from 'helpers/generic';

const AllCreditLogsContainer = ({ isFetching, fetchAllInvoices }) => {
    componentDidMount(fetchAllInvoices);

    return <AllCreditLogs isFetching={isFetching} />;
};

const mapStateToProps = ({
    companyAdmin: {
        creditsReducer: { isFetching: fetchingCredits },
        invoicesReducer: { isFetching: fetchingInvoices }
    }
}) => ({ isFetching: fetchingCredits || fetchingInvoices });

const mapDispatchToProps = { fetchAllInvoices };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllCreditLogsContainer);
