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

    componentDidUpdate = (prevProps, prevState) => {
        const { fetchingFullReports, fetchCompanyReportsFull } = this.props;
        const { fetchFullReports } = this.state;

        if (fetchingFullReports && !prevProps.fetchingFullReports) {
            console.warn('hitting props fetchingFullReports');
            this.setState({
                fetchingFullReports: true,
            });
            clearInterval(this._interval);
            this._interval = setInterval(() => fetchCompanyReportsFull(), 5000);
        }
        if (!prevState.fetchFullReports && fetchFullReports) {
            console.warn('hitting state clear interval');
        }
    };
    componentDidMount = () => {
        const { fetchCompanyReports, fetchingFullReports } = this.props;
        console.log({ fetchingFullReports });
        this._interval = setInterval(() => fetchCompanyReports(), 5000);
    };

    componentWillUnmount = () => clearInterval(this._interval);
}

const mapDispatchToProps = { fetchCompanyReports, fetchCompanyReportsFull };
const mapStateToProps = ({
    companyAdmin: {
        companyReportsReducer: { fetchingFullReports },
    },
}) => ({
    fetchingFullReports,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyReportsQueueContainer);
