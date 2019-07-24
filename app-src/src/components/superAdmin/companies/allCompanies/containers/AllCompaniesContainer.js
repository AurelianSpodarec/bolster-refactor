import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';
import AllCompanies from '../presentational/AllCompanies';

class AllCompaniesContainer extends Component {
    render() {
        return <AllCompanies />;
    }
    componentDidMount = () => this.props.fetchAllCompanies();
}

const mapDispatchToProps = { fetchAllCompanies };

export default connect(
    null,
    mapDispatchToProps
)(AllCompaniesContainer);
