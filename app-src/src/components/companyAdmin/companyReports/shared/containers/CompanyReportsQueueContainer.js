import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchCompanyReports from 'actions/companyAdmin/companyReports/async/fetchCompanyReports';
import CompanyReports from '../presentational/CompanyReports';
import fetchCompanyReportsFull from 'actions/companyAdmin/companyReports/async/fetchCompanyReportsFull';

class CompanyReportsQueueContainer extends Component {
    state = {
        fetchFullReports: false,
    };

    render = () => <CompanyReports />;

    componentDidUpdate = prevProps => {
        const { fetchingFullReports, fetchCompanyReportsFull } = this.props;

        if (fetchingFullReports && !prevProps.fetchingFullReports) {
            this.setState({
                fetchingFullReports: true,
            });
            clearInterval(this._interval);
            this._interval = setInterval(() => {
                fetchCompanyReportsFull();
            }, 5000);
        }
    };
    componentDidMount = () => {
        const { fetchCompanyReports } = this.props;
        fetchCompanyReports();
        this._interval = setInterval(() => {
            fetchCompanyReports();
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

const mapDispatchToProps = { fetchCompanyReports, fetchCompanyReportsFull };

export default connect(mapStateToProps, mapDispatchToProps)(CompanyReportsQueueContainer);
