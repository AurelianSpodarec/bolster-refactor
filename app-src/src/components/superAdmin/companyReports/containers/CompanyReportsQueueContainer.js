import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchCompanyReportsQueue from 'actions/superAdmin/companyReports/fetchCompanyReportsQueue';
import CompanyReportsQueue from '../presentational/CompanyReportsQueue';

class CompanyReportsQueueContainer extends Component {
    render() {
        return <CompanyReportsQueue />;
    }

    componentDidMount = () => {
        this.props.fetchCompanyReportsQueue();
    };
}

const mapStateToProps = ({ superAdmin }) => ({});

const mapDispatchToProps = dispatch => ({
    fetchCompanyReportsQueue: () => dispatch(fetchCompanyReportsQueue())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyReportsQueueContainer);
