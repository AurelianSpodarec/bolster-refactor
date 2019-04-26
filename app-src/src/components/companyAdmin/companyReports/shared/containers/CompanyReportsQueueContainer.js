import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchCompanyReports from 'actions/companyAdmin/companyReports/async/fetchCompanyReports';
import CompanyReports from '../presentational/CompanyReports';

class CompanyReportsContainer extends Component {
    render = () => <CompanyReports />;

    componentDidMount() {
        this.props.fetchCompanyReports();
    }

    // ? update queue on timer / live / refresh button
}

const mapDispatchToProps = dispatch => ({
    fetchCompanyReports: () => {
        return dispatch(fetchCompanyReports());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(CompanyReportsContainer);
