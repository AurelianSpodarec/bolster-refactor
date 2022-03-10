import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchCompanyReports from 'actions/companyAdmin/companyReports/async/fetchCompanyReports';
import CompanyReports from '../presentational/CompanyReports';
import fetchCompanyReportsFull from 'actions/companyAdmin/companyReports/async/fetchCompanyReportsFull';
import fetchMessagesBasic from 'actions/companyAdmin/messages/async/fetchMessagesBasic';
import { MESSAGE_TYPES } from '../../../../../constants/companyAdmin/enums';

class CompanyReportsQueueContainer extends Component {
    state = {
        fetchFullReports: false,
    };

    render = () => <CompanyReports />;

    componentDidUpdate = prevProps => {
        const { fetchingFullReports, fetchCompanyReportsFull, fetchMessagesBasic } = this.props;

        if (fetchingFullReports && !prevProps.fetchingFullReports) {
            this.setState({
                fetchingFullReports: true,
            });
            clearInterval(this._interval);
            this._interval = setInterval(() => {
                fetchCompanyReportsFull();
                fetchMessagesBasic();
            }, 5000);
        }
    };
    componentDidMount = () => {
        const { fetchCompanyReports, fetchMessagesBasic } = this.props;
        fetchCompanyReports();

        this._interval = setInterval(() => {
            fetchCompanyReports();
            fetchMessagesBasic();
        }, 5000);
    };

    componentWillUnmount = () => clearInterval(this._interval);
}

const mapStateToProps = ({
    companyAdmin: {
        companyReportsReducer: { fetchingFullReports },
    },
}) => ({
    fetchingFullReports,
});

const mapDispatchToProps = {
    fetchCompanyReports,
    fetchCompanyReportsFull,
    fetchMessagesBasic,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyReportsQueueContainer);
