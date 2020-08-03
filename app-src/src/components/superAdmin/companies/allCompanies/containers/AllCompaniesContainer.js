import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import AllCompanies from '../presentational/AllCompanies';

class AllCompaniesContainer extends Component {
    render() {
        return <AllCompanies />;
    }
    componentDidMount = () => {
        this.props.fetchAllCompanies();
        this.props.fetchAllServices();
    };
}

const mapDispatchToProps = { fetchAllCompanies, fetchAllServices };

export default connect(null, mapDispatchToProps)(AllCompaniesContainer);
