import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCreditLogs from 'actions/companyAdmin/creditLogs/async/fetchCreditLogs';

import AllCreditLogs from '../presentational/AllCreditLogs';

class AllCreditLogsContainer extends Component {
    render() {
        const { creditLogs, isFetching, error } = this.props;

        return (
            <AllCreditLogs
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

const mapDispatchToProps = dispatch => ({
    fetchCreditLogs: () => {
        dispatch(fetchCreditLogs());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AllCreditLogsContainer);
