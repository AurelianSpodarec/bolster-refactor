import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';

import Invoices from '../presentational/Invoices';

class InvoicesContainer extends Component {
    render() {
        return <Invoices />;
    }

    componentDidMount = () => {
        this.props.fetchAllInvoices();
    };

    componentDidUpdate = prevProps => {
        const {
            users,
            companyUserID,
            postSuccess,
            fetchSubscriptionData,
            history
        } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            fetchSubscriptionData();
        }

        if (
            users &&
            companyUserID &&
            users[companyUserID] &&
            users[companyUserID].shouldRestrictPayments
        ) {
            if (users[companyUserID].shouldRestrictPayments) {
                history.push('/company/subscription');
            }
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users }
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { companyUserID }
        }
    }
}) => ({
    companyUserID,
    users
});
const mapDispatchToProps = dispatch => ({
    fetchAllInvoices: () => {
        dispatch(fetchAllInvoices());
    }
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InvoicesContainer)
);
