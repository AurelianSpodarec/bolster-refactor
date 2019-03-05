import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCreditLogs from 'actions/creditLogs/async/fetchCreditLogs';

import CreditLogsTable from '../presentational/CreditLogsTable';

class CreditLogsListContainer extends Component {
    render() {
        const { creditLogs, isFetching, error } = this.props;
        const tableHeaders = ['Date added', 'Name', 'Location', 'Status'];

        return (
            <CreditLogsTable
                headers={tableHeaders}
                creditLogs={creditLogs}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    componentDidMount = () => {
        this.props.fetchCreditLogs();
    };
}

const mapStateToProps = ({ creditLogsReducers }) => ({
    creditLogs: Object.values(creditLogsReducers.creditLogs.creditLogs),
    isFetching: creditLogsReducers.creditLogs.isFetching,
    error: creditLogsReducers.creditLogs.error
});

const mapDispatchToProps = dispatch => ({
    fetchCreditLogs: () => {
        dispatch(fetchCreditLogs());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditLogsListContainer);
